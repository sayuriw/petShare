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
import logo from '../../data/petshare.png'

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
    <Page title={logo}>
      <BoxStyled>
        <p>
          Already have an Account?
          <LinkStyled to="/">Login</LinkStyled>
        </p>
        <FormStyled onSubmit={event => handleSubmit(event)}>
          <LabelStyled>
            Name
            <InputStyled
              name="name"
              type="text"
              value={newUser.name}
              onChange={event => handleChange(event)}
            />
            <span>{errors.name}</span>
          </LabelStyled>
          <LabelStyled>
            Email
            <InputStyled
              name="email"
              type="text"
              value={newUser.email}
              onChange={event => handleChange(event)}
            />
            <span>{errors.email}</span>
          </LabelStyled>
          <LabelStyled>
            Password
            <InputStyled
              name="password"
              type="password"
              value={newUser.password}
              onChange={event => handleChange(event)}
            />
            <span>{errors.email}</span>
          </LabelStyled>
          <LabelStyled>
            Password
            <InputStyled
              name="repeatPassword"
              type="password"
              value={newUser.repeatPassword}
              onChange={event => handleChange(event)}
            />
            <span>{errors.email}</span>
          </LabelStyled>
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
const LabelStyled = styled.label`
 
 
`
const InputStyled = styled.input`
  width: 100%;
  font-size: 1rem;
  :focus {
    border: deeppink solid 1px;
  }
`

const ButtonStyled = styled.button`
  padding: 10px;
  margin: 20px;
  font-size: 18px;
  border-radius: 3px;
  color: white;
  background-color: #6f6f6f;
`
const LinkStyled = styled(Link)`
  text-decoration: none;
  color: var(--blue);
  padding-left: 5px;
`