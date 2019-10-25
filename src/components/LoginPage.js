import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { Link, Redirect } from 'react-router-dom'
import styled from 'styled-components/macro'
import Page from '../common/Page'
import logo from '../images/petshareSpaced.png'
import { UsersContext } from '../providers'
import { fetchUserLogin, setToStorage } from '../utils/userServices'

LoginPage.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired,
  setLoginError: PropTypes.func,
  loginError: PropTypes.string
}

export default function LoginPage({
  setIsLoggedIn,
  loginError,
  setLoginError
}) {
  const [user, setUser] = useContext(UsersContext)
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [isCreated, setIsCreated] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()

    const LoginData = {
      email: loginEmail,
      password: loginPassword
    }

    fetchUserLogin(LoginData).then(json => {
      if (json.success) {
        console.log('lll',json)
        setToStorage('user', { token: json.token, userId: json.userId })
        setLoginError(json.message)
        setLoginPassword('')
        setLoginEmail('')
        setIsCreated(true)
        setUser({_id: json.userId, bookmarkedCards: json.bookmarkedCards})
        setIsLoggedIn(true)
      } else {
        setLoginError(json.message)
      }
    })
  }

  return isCreated ? (
    <Redirect to="/home" />
  ) : (
    <Page title={logo} showFilter={false}>
      <BoxStyled>
        <ErrorMessageStyled>{loginError !== 'Signed in' && loginError}</ErrorMessageStyled>
        <LoginFormStyled onSubmit={handleSubmit}>
          <label>
            Email
            <InputStyled
              name="email"
              type="text"
              value={loginEmail}
              onChange={event => setLoginEmail(event.target.value)}
            />
          </label>
          <label>
            Password
            <InputStyled
              name="password"
              type="password"
              value={loginPassword}
              onChange={event => setLoginPassword(event.target.value)}
            />
          </label>
          <ButtonStyled>Login</ButtonStyled>
        </LoginFormStyled>
        <p>
          Not registered yet?
          <LinkStyled to="/register">Register</LinkStyled>
        </p>
      </BoxStyled>
    </Page>
  )
}


const ErrorMessageStyled = styled.p`
  color: red;
`
const BoxStyled = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 80px;
  background-color: white;
  padding: 20px;
`
const LoginFormStyled = styled.form`
  display: grid;
  gap: 25px;
  padding-top: 0;
  padding: 0px;
  justify-content: center;
  margin-top: 10px;
`
const InputStyled = styled.input`
  width: 100%;
  font-size: 1rem;
  border: var(--grey) solid 1px;
  :focus {
    border: var(--blue) solid 2px;
  }
`
const ButtonStyled = styled.button`
  text-decoration: none;
  background-image: linear-gradient(45deg,#014499,#008ace);
  padding: 8px 10px;
  margin: 10px 20px;
  border-radius: 10px;
  font-size: 16px;
  color: var(--white);
`
const LinkStyled = styled(Link)`
  text-decoration: none;
  font-weight: 700;
  color: var(--blue);
  padding-left: 5px;
`
