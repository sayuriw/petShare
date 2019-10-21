import React, { useState, useContext, useEffect } from 'react'
import CardsListPage from './CardsListPage'
import { Redirect } from 'react-router-dom'
import RegisterPage from './RegisterPage'
import LogoutPage from './LogoutPage'
import styled from 'styled-components'
import NavBarLoggedIn from './NavbarLoggedIn'
import CreateCardPage from './CreateCardPage'
import LoginPage from './LoginPage'
import { patchCard, postCard } from '../utils/cardServices'
import { getFromStorage } from '../utils/userServices'
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
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loginError, setLoginError] = useState('')

  useEffect(_ => console.log("logged in?", isLoggedIn), [isLoggedIn])
  useEffect(() => {
    const userObj = getFromStorage('user')
    if (userObj && userObj['token']) {
      fetch('/users/verify?token=' + userObj.token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            setLoginError('')
            setIsLoggedIn(true)
          } else {
            setLoginError()
          }
        })
    }
  }, [])

  function renderDependingOnAuth() {
    console.log(pets)
    if (isLoggedIn) {
      return (
      <AppStyled>
          <Switch>
            <Route exact path="/home" render={() => <CardsListPage />} />
            <Route
              exact
              path="/favorites"
              render={() => {
                return <CardsListPage showOnlyBookmarks={true} />
              }}
            />
            <Route
              path="/newCard"
              render={() => (
                <CreateCardPage onSubmit={createCard} editCardData={{}} />
              )}
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
            <Route path="/logout" render={() => ( <LogoutPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>)} />
            </Switch>
          <NavBarLoggedIn/>
        </AppStyled>
      )
    } else {
      return (
        <Switch>
          <Route exact path="/logout" render={() => <Redirect to="/" />} />
          <Route
              exact
              path="/"
              render={() => (
                <LoginPage
                  loginError={loginError}
                  setIsLoggedIn={setIsLoggedIn}
                  setLoginError={setLoginError}
                />
              )}
            />
            <Route path="/register" render={() => <RegisterPage setIsLoggedIn={setIsLoggedIn} />} />
          </Switch>
      )
    }
  }
    return (
     <PetsProvider>
      <Router>
        <AppStyled>
          {renderDependingOnAuth()}
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
