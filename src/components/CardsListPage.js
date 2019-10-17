import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import { getCards, patchCard, deleteCard} from '../components/cards/services'
import Card from '../components/cards/Card'
import Filter from '../components/Filter'
import Page from '../common/Page'
import logo from '../data/petshare.png'
import { PetsContext } from './App'

export default function CardsListPage({ showOnlyBookmarks }) {
  const [pets, setPets] = useContext(PetsContext)
  const [petsFiltered, setPetsFiltered] = useState(pets)
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [selectedTag, setSelectedTag] = useState('')

  useEffect(() => {
    getCards(pets).then(pets => {
      pets.sort((a, b) => {
        const dateA = new Date(b.createdDate).getTime()
        const dateB = new Date(a.createdDate).getTime()
        return dateA < dateB ? -1 : dateA > dateB ? 1 : 0
      })
      setPets(showOnlyBookmarks ? pets.filter(pet => pet.isBookmarked) : pets)
    })
  }, [pets])

  useEffect(() => {
    handleTagClick(selectedFilter, selectedTag)
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
    <Page title={logo}>
      <Scroller>
        <Filter
          tags={allTags}
          activeTag={selectedTag}
          onTagClick={handleTagClick}
        />

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
    patchCard(pet._id, { isBookmarked: !pet.isBookmarked }).then(updatedPet => {
      const index = pets.findIndex(pet => pet._id === updatedPet._id)
      setPets([
        ...pets.slice(0, index),
        { ...pet, isBookmarked: !pet.isBookmarked },
        ...pets.slice(index + 1)
      ])
    })
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
