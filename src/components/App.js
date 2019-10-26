import React, { useContext, useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import styled from 'styled-components'
import { PetsContext, UsersContext } from '../providers'
import { patchCard, postCard } from '../utils/cardServices'
import {
  getCurrentUser,
  getFromStorage,
  verifyUser
} from '../utils/userServices'
import CardsListPage from './CardsListPage'
import CreateCardPage from './CreateCardPage'
import LoginPage from './LoginPage'
import LogoutPage from './LogoutPage'
import NavBarLoggedIn from './NavbarLoggedIn'
import RegisterPage from './RegisterPage'

export default function App() {
  const [pets, setPets] = useContext(PetsContext)
  const [user, setUser] = useContext(UsersContext)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loginError, setLoginError] = useState('')

  useEffect(() => {
    const user = getFromStorage('user')
    if (user && user['token']) {
      verifyUser(user.token).then(res => {
        if (res.success) {
          setLoginError('')
          getCurrentUser(user.userId).then(newUser => {
            setUser(newUser)
            setIsLoggedIn(true)
          })
        } else {
          setLoginError()
        }
      })
    }
  }, [])

  useEffect(_ => console.log('logged in?', isLoggedIn), [isLoggedIn])

  function renderDependingOnAuth() {
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
            <Route
              path="/logout"
              render={() => (
                <LogoutPage  isLoggedInState={[isLoggedIn, setIsLoggedIn]}/>
              )}
            />
          </Switch>
          <NavBarLoggedIn />
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
          <Route
            path="/register"
            render={() => <RegisterPage setIsLoggedIn={setIsLoggedIn} />}
          />
        </Switch>
      )
    }
  }
  return (
    <Router>
      <AppStyled>{renderDependingOnAuth()}</AppStyled>
    </Router>
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
