import PropTypes from 'prop-types'
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import Page from '../common/Page'
import Card from '../components/cards/Card'
import logo from '../images/petShareLogo.png'
import { PetsContext, UsersContext } from '../providers'
import { deleteCard, getCards, patchCard } from '../utils/cardServices'
import { getFromStorage, updateUser } from '../utils/userServices'

CardsListPage.propTypes = {
  showOnlyBookmarks: PropTypes.bool
}

export default function CardsListPage({ showOnlyBookmarks }) {
  const sessionUser = getFromStorage('user')
  const sessionUserId = sessionUser.userId
  const [pets, setPets] = useContext(PetsContext)
  const [user, setUser] = useContext(UsersContext)
  const [petsFiltered, setPetsFiltered] = useState(pets)
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [selectedTag, setSelectedTag] = useState('')

  console.log(sessionUser)
  useEffect(() => {
    filterBookmark()
  }, [showOnlyBookmarks])

  useEffect(() => {
    handleTagClick(selectedFilter, selectedTag)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pets])

  const allTags = {}
  pets.forEach(pet => {
    Object.keys(pet.tags).forEach(tag => {
      allTags[tag] === undefined
        ? (allTags[tag] = [pet.tags[tag]])
        : (allTags[tag] = Array.from(new Set([...allTags[tag], pet.tags[tag]])))
    })
  })

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

  function filterBookmark() {
    getCards(pets).then(pets => {
      const bookmarkedPets = pets.map(pet => ({
        ...pet,
        isBookmarked: user.bookmarkedCards.includes(pet._id)
      }))
      bookmarkedPets.sort((a, b) => {
        const dateA = new Date(b.createdDate).getTime()
        const dateB = new Date(a.createdDate).getTime()
        return dateA < dateB ? -1 : dateA > dateB ? 1 : 0
      })
      setPets(showOnlyBookmarks ? bookmarkedPets.filter(pet => pet.isBookmarked) : bookmarkedPets)
    })
  }

  function handleTagClick(selectedFilter, clickedTag) {
    setSelectedTag(clickedTag)
    setSelectedFilter(selectedFilter)
    if (selectedFilter === 'all') {
      setPetsFiltered(pets)
    } else {
      const newPetsFiltered = pets.filter(
        pet => pet.tags[selectedFilter] === clickedTag
      )
      setPetsFiltered(newPetsFiltered)
    }
  }

  function handleDeleteClick(pet) {
    if (window.confirm('Are you sure you wish to delete this item?')) {
      deleteCard(pet._id).then(deletedPet => {
        const index = pets.findIndex(pet => pet._id === deletedPet._id)
        setPets([...pets.slice(0, index), ...pets.slice(index + 1)])
      })
    }
  }

  function handleBookmarkClick(pet) {
    updateUser(sessionUserId, {
      petId: pet._id
    }).then(updatedUser => setUser(updatedUser))

    const bookmarks = user.bookmarkedCards
    if (bookmarks.includes(pet._id)) {
      const bookmark = bookmarks.find(bookmark => bookmark === pet._id)
      const index = pets.findIndex(pet => pet._id === bookmark)
      setPets([
        ...pets.slice(0, index),
        { ...pet, isBookmarked: false },
        ...pets.slice(index + 1)
      ])
    } else {
      const index = pets.indexOf(pet)
      setPets([
        ...pets.slice(0, index),
        { ...pet, isBookmarked: true },
        ...pets.slice(index + 1)
      ])
    }
  }

  function onEditClick(id, editData) {
    patchCard(id, editData).then(editPet => {
      const index = pets.findIndex(pet => pet._id === editPet._id)
      setPets([...pets.slice(0, index), editPet, ...pets.slice(index + 1)])
    })
  }
}
const Scroller = styled.div`
  display: grid;
  gap: 20px;
  overflow-y: auto;
  scroll-behavior: smooth;
  padding: 20px 10px;
`
