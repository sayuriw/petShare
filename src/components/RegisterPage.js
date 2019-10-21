import React, { useState } from 'react'
import styled from 'styled-components/macro'
import Page from '../common/Page'
import { Link, Redirect } from 'react-router-dom'
import logo from '../data/petshare.png'
import { postUser, setToStorage } from '../utils/userServices'

export default function Register({ setIsLoggedIn }) {
  
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [isCreated, setIsCreated] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    
    const registerData = {
      email: email,
      password: password,
      repeatedPassword: repeatPassword,
      name: name
    }  
    postUser(registerData).then(json => {
      
      if (json.success) {
        setError(json.message)
        setToStorage('user', { token: json.token })
        setToStorage('userId', { userId: json.userId })
        setEmail('')
        setPassword('')
        setName('')
        setRepeatPassword('')
        setIsCreated(true)
        setIsLoggedIn(true)
      } else {
        setError(json.message)
      }
    })
  }

  return (
    isCreated ? <Redirect exact to="/home" /> :
    <Page title={logo} showFilter={false}>
      <BoxStyled>
        <p>
          Already have an Account?
          <LinkStyled exact to="/">Login</LinkStyled>
        </p>
        <ErrorMessageStyled>{error}</ErrorMessageStyled>
        <FormStyled onSubmit={event => handleSubmit(event)}>
          <label>
            Name
            <InputStyled
              name="name"
              type="text"
              value={name}
              onChange={event => setName(event.target.value)}
            />
          </label>
          <label>
            Email
            <InputStyled
              name="email"
              type="text"
              value={email}
              onChange={event => setEmail(event.target.value)}
            />
          </label>
          <label>
            Password
            <InputStyled
              name="password"
              type="password"
              value={password}
              onChange={event => setPassword(event.target.value)}
            />
          </label>
          <label>
            Password
            <InputStyled
              name="repeatPassword"
              type="password"
              value={repeatPassword}
              onChange={event => setRepeatPassword(event.target.value)}
            />
          </label>
          <ButtonStyled>Register</ButtonStyled>
        </FormStyled>
      </BoxStyled>
    </Page>
  )
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

const FormStyled = styled.form`
  display: grid;
  gap: 25px;
  padding-top: 0;
  padding: 0px;
  justify-content: center;
  margin-top: 10px;
`
const ErrorMessageStyled = styled.p`
  color: red;
`

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

