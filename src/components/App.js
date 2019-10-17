import React, { useState, useContext } from 'react'
//import EditCardPage from './EditCardPage'
import CardsListPage from './CardsListPage'
import styled from 'styled-components'
import NavBar from './Navbar'
import CreateCardPage from './CreateCardPage'
import { patchCard, postCard } from '../components/cards/services'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

export const PetsContext = React.createContext([[], () => {}])

function PetsProvider({ children }) {
  const [pets, setPets] = useState([])

  return (
    <PetsContext.Provider value={[pets, setPets]}>
      {children}
    </PetsContext.Provider>
  )
}

export default function App() {
  const [pets, setPets] = useContext(PetsContext)

  return (
    <PetsProvider>
      <Router>
        <AppStyled>
          <Switch>
            <Route exact path="/" render={() => <CardsListPage />} />
            <Route
              exact
              path="/favorites"
              render={() => {
                return <CardsListPage showOnlyBookmarks={true} />
              }}
            />
            <Route
              path="/newCard"
              render={() => <CreateCardPage onSubmit={createCard} editCardData={{}} />}
            />
            <Route
              path="/edit"
              render={props => {
                return (
                  <CreateCardPage
                    onSubmit={handleEditClick}
                    editCardData={props.location.editCardData}
                  />
                )
              }}
            />
          </Switch>
          <NavBar />
        </AppStyled>
      </Router>
    </PetsProvider>
  )

  function handleEditClick(id, editData) {
    patchCard(id, editData).then(editPet => {
      const index = pets.findIndex(pet => pet._id === editPet._id)
      setPets([...pets.slice(0, index), editPet, ...pets.slice(index + 1)])
    })
  }

  function createCard(cardData) {
    postCard(cardData).then(pet => {
      setPets([pet, ...pets])
    })
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

