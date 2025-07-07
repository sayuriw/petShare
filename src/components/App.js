import React, { useContext, useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  useLocation
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

function EditRoute({ handleEditClick }) {
  const location = useLocation()
  return (
    <CreateCardPage
      onSubmit={handleEditClick}
      editCardData={location?.state?.editCardData}
    />
  )
}

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
  }, [setUser])

  useEffect(() => console.log('logged in?', isLoggedIn), [isLoggedIn])

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

  return (
    <Router>
      <AppStyled>
        <Routes>
          {isLoggedIn ? (
            <>
              <Route path="/" element={<CardsListPage />} />
              <Route
                path="/favorites"
                element={<CardsListPage showOnlyBookmarks={true} />}
              />
              <Route
                path="/newCard"
                element={
                  <CreateCardPage onSubmit={createCard} editCardData={{}} />
                }
              />
              <Route
                path="/edit"
                element={<EditRoute handleEditClick={handleEditClick} />}
              />
              <Route
                path="/logout"
                element={
                  <LogoutPage
                    isLoggedIn={isLoggedIn}
                    setIsLoggedIn={setIsLoggedIn}
                  />
                }
              />
            </>
          ) : (
            <>
              <Route
                path="/"
                element={
                  <LoginPage
                    loginError={loginError}
                    setIsLoggedIn={setIsLoggedIn}
                    setLoginError={setLoginError}
                  />
                }
              />
              <Route
                path="/register"
                element={<RegisterPage setIsLoggedIn={setIsLoggedIn} />}
              />
              <Route path="/logout" element={<Navigate to="/" replace />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          )}
        </Routes>
        {isLoggedIn && <NavBarLoggedIn />}
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
  @media (min-width: 900px) {
    width: 375px;
    height: 667px;
    border: 20px solid black;
    border-width: 45px 20px;
    border-radius: 20px;
    box-shadow: 30px 40px 30px #2264;
    margin: 40px auto;
  }
`
