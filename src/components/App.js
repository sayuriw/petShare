import React, {useState} from 'react'
import CardList from './cards/CardList'
import styled from 'styled-components'
import  petsData from './cards/petsData'
import NavBar from './Navbar'
import { BrowserRouter as Router, Route  } from 'react-router-dom'


export default function App() {

  const [pets, setPets] = useState(petsData)
  const [petsFiltered, setPetsFiltered] = useState(pets)
  const [selectedTag, setSelectedTag] = useState('all')

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
                      onBookmarkClick={handleBookmarkClick} 
                      pets={petsFiltered}/>}
            />
          <Route path="/favorites" render={() => 
            <CardList 
                      tags={allTags} 
                      onSelectTag={setSelectedTag} 
                      onBookmarkClick={handleBookmarkClick} 
                      pets={onFavoritesClick()}/>}/> 
        </WrapperStyled>
        <NavBar/>
      </AppStyled>
    </Router>
  )

  function handleTagClick(selectedFilter, clickedTag) {
    if (selectedFilter === 'all') {
      setPetsFiltered(pets)
    } else {
      const newPetsFiltered = pets.filter(pet => pet.tags[selectedFilter] === clickedTag)
      setPetsFiltered(newPetsFiltered)
    }
  }

  function handleBookmarkClick(pet) {
    const index = pets.indexOf(pet)
    setPetsFiltered ([
      ...pets.slice(0, index),
      { ...pet, isBookmarked: !pet.isBookmarked },
      ...pets.slice(index + 1),
    ])
  }

  function onFavoritesClick() {
    const filteredPets= pets.filter(pet => pet.isBookmarked)
    return filteredPets
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