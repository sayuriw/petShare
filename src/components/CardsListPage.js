import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import Page from '../common/Page'
import Card from '../components/cards/Card'
import logo from '../images/petShareLogo.png'
import { usePets, useUsers } from '../providers'
import { deleteCard, getCards, patchCard } from '../utils/cardServices'
import { getFromStorage, updateUser } from '../utils/userServices'

CardsListPage.propTypes = {
  showOnlyBookmarks: PropTypes.bool
}

export default function CardsListPage({ showOnlyBookmarks }) {
  const sessionUser = getFromStorage('user')
  const sessionUserId = sessionUser.userId
  const [pets, setPets] = usePets()
  const [user, setUser] = useUsers()
  const [petsFiltered, setPetsFiltered] = useState(pets)
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [selectedTag, setSelectedTag] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  // Fetch cards only once on mount
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const fetchedPets = await getCards()
        const bookmarkedPets = fetchedPets.map(pet => ({
          ...pet,
          isBookmarked: user.bookmarkedCards.includes(pet._id)
        }))
        bookmarkedPets.sort((a, b) => {
          const dateA = new Date(b.createdDate).getTime()
          const dateB = new Date(a.createdDate).getTime()
          return dateA < dateB ? -1 : dateA > dateB ? 1 : 0
        })
        setPets(showOnlyBookmarks ? bookmarkedPets.filter(pet => pet.isBookmarked) : bookmarkedPets)
        setPetsFiltered(showOnlyBookmarks ? bookmarkedPets.filter(pet => pet.isBookmarked) : bookmarkedPets)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching cards:', error)
        setIsLoading(false)
      }
    }
    fetchCards()
  }, [setPets, showOnlyBookmarks, user.bookmarkedCards])

  const handleTagClick = useCallback((filter, tag) => {
    setSelectedTag(tag)
    setSelectedFilter(filter)
    if (filter === 'all') {
      setPetsFiltered(pets)
    } else {
      const newPetsFiltered = pets.filter(
        pet => pet.tags[filter] === tag
      )
      setPetsFiltered(newPetsFiltered)
    }
  }, [pets])

  const handleDeleteClick = useCallback((pet) => {
    if (window.confirm('Are you sure you wish to delete this item?')) {
      deleteCard(pet._id).then(deletedPet => {
        const index = pets.findIndex(p => p._id === deletedPet._id)
        const newPets = [...pets.slice(0, index), ...pets.slice(index + 1)]
        setPets(newPets)
        setPetsFiltered(newPets)
      })
    }
  }, [pets, setPets])

  const handleBookmarkClick = useCallback((pet) => {
    updateUser(sessionUserId, {
      petId: pet._id
    }).then(updatedUser => {
      setUser(updatedUser)
      const bookmarks = updatedUser.bookmarkedCards
      const index = pets.findIndex(p => p._id === pet._id)
      const isNowBookmarked = bookmarks.includes(pet._id)
      
      const newPets = [
        ...pets.slice(0, index),
        { ...pet, isBookmarked: isNowBookmarked },
        ...pets.slice(index + 1)
      ]
      setPets(newPets)
      setPetsFiltered(prevFiltered => {
        const filteredIndex = prevFiltered.findIndex(p => p._id === pet._id)
        if (filteredIndex === -1) return prevFiltered
        return [
          ...prevFiltered.slice(0, filteredIndex),
          { ...pet, isBookmarked: isNowBookmarked },
          ...prevFiltered.slice(filteredIndex + 1)
        ]
      })
    })
  }, [pets, setPets, sessionUserId, setUser])

  const onEditClick = useCallback((id, editData) => {
    patchCard(id, editData).then(editPet => {
      const index = pets.findIndex(pet => pet._id === editPet._id)
      const newPets = [...pets.slice(0, index), editPet, ...pets.slice(index + 1)]
      setPets(newPets)
      setPetsFiltered(prevFiltered => {
        const filteredIndex = prevFiltered.findIndex(p => p._id === editPet._id)
        if (filteredIndex === -1) return prevFiltered
        return [
          ...prevFiltered.slice(0, filteredIndex),
          editPet,
          ...prevFiltered.slice(filteredIndex + 1)
        ]
      })
    })
  }, [pets, setPets])

  const allTags = useMemo(() => {
    const tags = {}
    pets.forEach(pet => {
      Object.keys(pet.tags).forEach(tag => {
        tags[tag] === undefined
          ? (tags[tag] = [pet.tags[tag]])
          : (tags[tag] = Array.from(new Set([...tags[tag], pet.tags[tag]])))
      })
    })
    return tags
  }, [pets])

  // Apply filter when pets or filter criteria change
  useEffect(() => {
    if (!isLoading) {
      handleTagClick(selectedFilter, selectedTag)
    }
  }, [selectedFilter, selectedTag, pets, isLoading]) // handleTagClick is stable due to useCallback

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <Page
      title={logo}
      tags={allTags}
      activeTag={selectedTag}
      onTagClick={handleTagClick}>
      <Scroller>
        {petsFiltered.map(pet => (
          <Card
            key={pet._id}
            id={pet._id}
            tags={pet.tags}
            title={pet.title}
            description={pet.description}
            onBookmarkClick={() => handleBookmarkClick(pet)}
            onDeleteClick={() => handleDeleteClick(pet)}
            onEditClick={() => onEditClick(pet)}
            isBookmarked={pet.isBookmarked}
            picture={pet.picture}
            email={pet.email}
          />
        ))}
      </Scroller>
    </Page>
  )
}

const Scroller = styled.div`
  display: grid;
  gap: 20px;
  overflow-y: auto;
  scroll-behavior: smooth;
  padding: 20px 10px;
`
