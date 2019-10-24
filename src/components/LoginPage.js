import React, { useState, useContext } from 'react'
import styled from 'styled-components/macro'
import { Link, Redirect } from 'react-router-dom'
import Page from '../common/Page'
import logo from '../data/petshareSpaced.png'
import { fetchUserLogin, setToStorage } from '../utils/userServices'
import { UsersContext } from '../providers'

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
        console.log(json)
        setToStorage('user', { token: json.token, userId: json.userId })
        //setToStorage('BookmarkedCards', { bookmarks: json.bookmarkedCards})
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
              onChange={onTextboxChangeLoginEmail}
            />
          </label>
          <label>
            Password
            <InputStyled
              name="password"
              type="password"
              value={loginPassword}
              onChange={onTextboxChangeLoginPassword}
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
  function onTextboxChangeLoginEmail(event) {
    setLoginEmail(event.target.value)
  }

  function onTextboxChangeLoginPassword(event) {
    setLoginPassword(event.target.value)
  }
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
