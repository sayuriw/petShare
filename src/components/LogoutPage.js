import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { Redirect } from 'react-router-dom'
import Page from '../common/Page'
import logo from '../data/petshare.png'
import { getFromStorage, setToStorage } from '../utils/userServices'

export default function Logout({isLoggedIn, setIsLoggedIn}) {
  const [token, setToken] = useState(getFromStorage('user'))

  return !isLoggedIn ? (
    <Redirect to="/" />
  ) : (
    <Page title={logo} showFilter={false}>
      <BoxStyled>
        <p>Are you sure you want to logout?</p>
        <ButtonStyled onClick={event => handlelogout(event)}>
          Logout
        </ButtonStyled>
      </BoxStyled>
    </Page>
  )

  function handlelogout(event) {
    fetch('users/logout?token=' + token.token)
      .then(res => res.json())
      .then(json => {
        setToStorage('user')
        setToken('')
        setIsLoggedIn(false)
      })
  }
}

const BoxStyled = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 50px;
  background-color: white;
  padding: 20px;
`

const ButtonStyled = styled.button`
  padding: 10px;
  margin: 20px;
  font-size: 18px;
  border-radius: 3px;
  color: white;
  background-color: var(--grey);
`

