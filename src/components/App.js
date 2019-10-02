import React, {useState} from 'react'
import CardList from './cards/CardList'
import styled from 'styled-components'
import  petsData from './cards/petsData'
import ToggleButton from './ToggleButton'


export default function App() {

  const [pets, setPets] = useState(petsData)

  function onFavoritesClick() {
    setPets([
      ...pets.filter(pet => pet.isBookmarked)
    ])
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
    <AppStyled>
      <ToggleButton onFavoritesClick={() => onFavoritesClick()}/>
      <CardList onBookmarkClick={handleBookmarkClick} pets={pets}/>
    </AppStyled>
  ) 
}

const AppStyled = styled.div`
  display: grid;
  grid-template-rows: auto;
  position: fixed;
  overflow-y: scroll;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  height: 100%;
  `

