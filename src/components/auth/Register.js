import React from 'react'
import styled from 'styled-components/macro'
import Page from '../../common/Page'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CHANGE_SIGN_UP_FORM,
  CHANGE_LOGIN_FORM,
  GET_ERRORS
} from '../../actions/actions'
import axios from 'axios'

export default function Register({ title }) {
  const dispatch = useDispatch()
  const history = useHistory()
  const newUser = useSelector(state => state.newUser)
  const loginData = useSelector(state => state.loginData)
  const errors = useSelector(state => state.authenticationError)

  function handleChange(event) {
    dispatch(
      CHANGE_SIGN_UP_FORM({
        ...newUser,
        [event.target.name]: event.target.value
      })
    )
  }

  function handleSubmit(event) {
    event.preventDefault()
    axios
      .post('/users/register', newUser)
      .then(_res => {
        dispatch(GET_ERRORS({}))
        redirectToLoginPage()
      })
      .catch(err => dispatch(GET_ERRORS(err.response.data)))
  }

  function redirectToLoginPage() {
    dispatch(
      CHANGE_LOGIN_FORM({
        ...loginData,
        email: newUser.email
      })
    )
    history.push('/')
  }

  return (
    <Page title={title}>
      <p>
        Already have an Account?
        <Link to="/login">Login</Link>
      </p>
      <FormStyled onSubmit={event => handleSubmit(event)}>
        <LabelStyled>
          Name
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            value={newUser.name}
            onChange={event => handleChange(event)}
          />
          <span>{errors.name}</span>
        </LabelStyled>
        <LabelStyled>
          Email
          <input
            name="email"
            type="text"
            placeholder="Email"
            value={newUser.email}
            onChange={event => handleChange(event)}
          />
          <span>{errors.email}</span>
        </LabelStyled>
        <LabelStyled>
          Password
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={newUser.password}
            onChange={event => handleChange(event)}
          />
          <span>{errors.email}</span>
        </LabelStyled>
        <LabelStyled>
          Password
          <input
            name="repeatPassword"
            type="password"
            placeholder="Repeat Password"
            value={newUser.repeatPassword}
            onChange={event => handleChange(event)}
          />
          <span>{errors.email}</span>
        </LabelStyled>
        <ButtonStyled>Register</ButtonStyled>
      </FormStyled>
    </Page>
  )
}

const FormStyled = styled.form`
  display: grid;
  gap: 25px;
  padding: 20px;
  justify-content: center;
  margin-top: 50px;
`
const LabelStyled = styled.label`
  display: grid;
  gap: 10px;
`
const ButtonStyled = styled.button`
  padding: 10px;
  margin: 20px;
  font-size: 18px;
  border-radius: 3px;
  color: white;
  background-color: #6f6f6f;
`
