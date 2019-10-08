import React, {useState, useEffect} from 'react'
import CardList from './cards/CardList'
import styled from 'styled-components'
import NavBar from './Navbar'
import CreateCard from './CreateCard'
import { getCards, patchCard, postCard, deleteCard } from './cards/services'
import { BrowserRouter as Router, Route  } from 'react-router-dom'


export default function App() {

  

  const [pets, setPets] = useState([])
  const [petsFiltered, setPetsFiltered] = useState(pets)
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [selectedTag, setSelectedTag] = useState('')

  useEffect(() => {
    getCards().then(setPets)
  }, [])

  useEffect(() => {
    handleTagClick(selectedFilter, selectedTag)
  }, [pets])

  const allTags = {}
  pets.forEach(pet => {
    Object.keys(pet.tags).forEach(tag => {
      allTags[tag] === undefined
        ? allTags[tag] = [pet.tags[tag]]
        : allTags[tag] = Array.from(new Set([...allTags[tag], pet.tags[tag]]))
    })
  })

    return (
    <Router>
      <AppStyled>
        <WrapperStyled>
          <Route exact path="/" render={() => 
            <CardList tags={allTags} 
                      onTagClick={handleTagClick}
                      activeTag={selectedTag}
                      onBookmarkClick={handleBookmarkClick} 
                      onDeleteClick={handleDeleteClick}
                      pets={petsFiltered}/>}
            />
          <Route path="/favorites" render={() => 
            <CardList 
                      tags={allTags} 
                      activeTag={selectedTag}
                      onTagClick={handleTagClick} 
                      onBookmarkClick={handleBookmarkClick}
                      onDeleteClick={handleDeleteClick} 
                      pets={onFavoritesClick()}/>}
            /> 
          <Route path="/newCard" render={() => <CreateCard onSubmit={createCard}/>}
            />
        </WrapperStyled>
        <NavBar/>
      </AppStyled>
    </Router>
  )

  function createCard(cardData) {
    postCard(cardData).then(pet => {
      console.log(pet)
      setPets([pet, ...pets])
    })
  }

  function handleTagClick(selectedFilter, clickedTag) {
    setSelectedTag(clickedTag)
    setSelectedFilter(selectedFilter)
    if (selectedFilter === 'all') {
      setPetsFiltered(pets)
    } else {
      const newPetsFiltered = pets.filter(pet => pet.tags[selectedFilter] === clickedTag)
      setPetsFiltered(newPetsFiltered)
    }
  }

  function handleDeleteClick(pet) {
    deleteCard(pet._id).then(deletedPet => {
      const index = pets.findIndex(pet => pet._id === deletedPet._id)
    setPets ([
        ...pets.slice(0, index),
        ...pets.slice(index + 1)
      ])
    })
  }

  function handleBookmarkClick(pet) {
    patchCard(pet._id, { isBookmarked: !pet.isBookmarked }).then(updatedPet => {
      const index = pets.findIndex(pet => pet._id === updatedPet._id)
    setPets ([
      ...pets.slice(0, index),
      { ...pet, isBookmarked: !pet.isBookmarked },
      ...pets.slice(index + 1),
    ])
  })
  }

  function onFavoritesClick() {
    const petsFilteredBookmarked = petsFiltered.filter(pet => pet.isBookmarked)
    return petsFilteredBookmarked
  }
}

const AppStyled = styled.div`
  display: grid;
  grid-template-rows: auto 48px;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  height: 100%;
  `
const WrapperStyled = styled.div`
  overflow-y: scroll;
  
`