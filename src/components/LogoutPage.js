import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components/macro'
import Page from '../common/Page'
import logout from '../images/logout1.png'
import { getFromStorage, setToStorage, logoutUser } from '../utils/userServices'

Logout.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}

export default function Logout({ isLoggedIn, setIsLoggedIn }) {
  const [user, setUser] = useState(getFromStorage('user'))
  
  return !isLoggedIn ? (
    <Redirect to="/" />
  ) : (
    <Page title={logout} showFilter={false}>
      <BoxStyled>
        <p>Are you sure you want to logout?</p>
        <ButtonStyled onClick={handlelogout}>Logout</ButtonStyled>
      </BoxStyled>
    </Page>
  )

  function handlelogout() {
    logoutUser(user.token).then(() => {
      setToStorage('user')
      setUser('')
      setIsLoggedIn(false)
    })
  }
}

const BoxStyled = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 100px;
  background-color: white;
  font-size: 1.2rem;
  padding: 40px;
`

const ButtonStyled = styled.button`
  text-decoration: none;
  background-image: linear-gradient(45deg, #014499, #008ace);
  padding: 8px 10px;
  border-radius: 10px;
  font-size: 16px;
  color: var(--white);
`
