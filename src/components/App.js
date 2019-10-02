import React, {useState} from 'react'
import CardList from './cards/CardList'
import styled from 'styled-components'
import  petsData from './cards/petsData'
import NavBar from './Navbar'
import { BrowserRouter as Router, Route  } from 'react-router-dom'


export default function App() {

  const [pets, setPets] = useState(petsData)

  function onFavoritesClick() {
    const filteredPets= pets.filter(pet => pet.isBookmarked)
    return filteredPets
  }

  function handleBookmarkClick(pet) {
      const index = pets.indexOf(pet)
      setPets([
        ...pets.slice(0, index),
        { ...pet, isBookmarked: !pet.isBookmarked },
        ...pets.slice(index + 1),
      ])
    }

    return (
    <Router>
      <AppStyled>
        <WrapperStyled>
          <Route exact path="/" render={() => <CardList onBookmarkClick={handleBookmarkClick} pets={pets}/>}/>
          <Route path="/favorites" render={() => <CardList onBookmarkClick={handleBookmarkClick} pets={onFavoritesClick()}/>}/> 
        </WrapperStyled>
        <NavBar/>
      </AppStyled>
    </Router>
  )
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