import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { Link, Redirect } from 'react-router-dom'
import styled from 'styled-components/macro'
import Page from '../common/Page'
import logo from '../images/petshareSpaced.png'
import { UsersContext } from '../providers'
import { postUser, setToStorage } from '../utils/userServices'

RegisterPage.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired
}

export default function RegisterPage({ setIsLoggedIn }) {
  const [user, setUser] = useContext(UsersContext)
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [isCreated, setIsCreated] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()

    const registerData = {
      email,
      password: password,
      repeatedPassword: repeatPassword,
      name: name
    }
    postUser(registerData).then(json => {
      if (json.success) {
        setError(json.message)
        setToStorage('user', { token: json.token, userId: json.userId })
        setUser({ _id: json.userId, bookmarkedCards: json.bookmarkedCards })
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

  return isCreated ? (
    <Redirect exact to="/" />
  ) : (
    <Page title={logo} showFilter={false}>
      <BoxStyled>
        <p>
          Already have an Account?
          <LinkStyled exact to="/">
            Login
          </LinkStyled>
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
            Repeat Password
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
  padding: 0;
  justify-content: center;
  margin-top: 10px;
`
const ErrorMessageStyled = styled.p`
  color: red;
`
const InputStyled = styled.input`
  width: 90%;
  font-size: 1rem;
  border: var(--grey) solid 1px;
  :focus {
    border: var(--blue) solid 2px;
  }
`
const ButtonStyled = styled.button`
  text-decoration: none;
  background-image: linear-gradient(45deg, #014499, #008ace);
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
