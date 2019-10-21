import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { Link, Redirect } from 'react-router-dom'
import Page from '../common/Page'
import logo from '../data/petshare.png'
import { fetchUserLogin, setToStorage } from '../utils/userServices'

export default function LoginPage({
  setIsLoggedIn,
  loginError,
  setLoginError
}) {
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
      console.log('json', json) ////console log if login successfull
      if (json.success) {
        setToStorage('user', { token: json.token })
        setToStorage('userId', { userId: json.userId })
        setLoginError(json.message)
        setLoginPassword('')
        setLoginEmail('')
        setIsCreated(true)
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
        <LoginFormStyled onSubmit={event => handleSubmit(event)}>
          <LabelStyled>
            Email
            <InputStyled
              name="email"
              type="text"
              value={loginEmail}
              onChange={onTextboxChangeLoginEmail}
            />
          </LabelStyled>
          <LabelStyled>
            Password
            <InputStyled
              name="password"
              type="password"
              value={loginPassword}
              onChange={onTextboxChangeLoginPassword}
            />
          </LabelStyled>
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
  margin-top: 50px;
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
const LabelStyled = styled.label``
const InputStyled = styled.input`
  width: 100%;
  font-size: 1rem;
  border: var(--grey) solid 1px;
  :focus {
    border: var(--blue) solid 1px;
  }
`

const ButtonStyled = styled.button`
  padding: 10px;
  margin: 20px;
  font-size: 18px;
  border-radius: 3px;
  color: white;
  background-color: var(--grey);
`
const LinkStyled = styled(Link)`
  text-decoration: none;
  color: var(--blue);
  padding-left: 5px;
`
