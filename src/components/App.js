import React from 'react'
import CardList from './cards/CardList'
import styled from 'styled-components'

export default function App() {
  
  function renderPage() {
    return (
    <AppStyled>
      <CardList />
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

