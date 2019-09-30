import React, { useState } from 'react'
import CardList from './cards/CardList'
import styled from 'styled-components'
import petsData from './data/pets.json'
//import pictures from './data/images/'


export default function App() {
  const [cards, setCards] = useState(petsData)
  

function renderPage() {
  return (
    <AppStyled>
      <CardList cards={cards}/>
    </AppStyled>
  )
  
  
}

return renderPage()


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

