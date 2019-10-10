import React, {useState, useEffect} from 'react'
import CardPage from './cards/CardPage'
import styled from 'styled-components'
import NavBar from './Navbar'
import CreateCardPage from './CreateCardPage'
import { getCards, patchCard, postCard, deleteCard } from './cards/services'
import { BrowserRouter as Router, Route, Switch  } from 'react-router-dom'


export default function App() {

  const [pets, setPets] = useState([])
  const [petsFiltered, setPetsFiltered] = useState(pets)
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [selectedTag, setSelectedTag] = useState('')

  useEffect(() => {
    getCards(pets)
    .then(
      (pets) => {pets.sort((a,b) => {
      const dateA = new Date(b.createdDate).getTime()
      const dateB = new Date(a.createdDate).getTime()
      return dateA < dateB ? -1 : dateA > dateB ? 1 : 0})
      setPets(pets)
      })
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

  const HomePage = withCardPage('PetShare')
  const FavoritesPage = withCardPage('Favorites', 'isBookmarked')

  return (
    <Router>
      <AppStyled>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/favorites" component={FavoritesPage} />
          <Route path="/newCard" render={() => 
            <CreateCardPage title="Create a new PetCard" onSubmit={createCard}/>}
          />
        </Switch>
        <NavBar/>
      </AppStyled>
    </Router>
  )
  
  function createCard(cardData) {
    postCard(cardData).then(pet => {
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
    if (window.confirm('Are you sure you wish to delete this item?')) {
    deleteCard(pet._id).then(deletedPet => {
      const index = pets.findIndex(pet => pet._id === deletedPet._id)
    setPets ([
        ...pets.slice(0, index),
        ...pets.slice(index + 1)
      ])
    })
   }
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
  
  function withCardPage(title, filterProp) {
    return () => {
      const petsFilteredByProp = filterProp ? petsFiltered.filter(pet => pet[filterProp]) : petsFiltered
      return <CardPage title={title}
                       tags={allTags} 
                       onTagClick={handleTagClick}
                       activeTag={selectedTag}
                       onBookmarkClick={handleBookmarkClick} 
                       onDeleteClick={handleDeleteClick}
                       pets={petsFilteredByProp}/>

    }
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