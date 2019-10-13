import React from 'react'
import styled from 'styled-components/macro'
import { Link } from 'react-router-dom';
import Page from '../../common/Page'
import { useSelector, useDispatch } from 'react-redux'
import { CHANGE_LOGIN_FORM, SET_CURRENT_USER, GET_ERRORS } from '../../actions/actions'
import axios from 'axios'
import { Home } from 'styled-icons/fa-solid/Home'
import setAuthToken from './setAuthToken'
import jwt_decode from 'jwt-decode'

export default function LoginPage({title}) {
  const dispatch = useDispatch()
  const loginData = useSelector(state => state.loginData)
  const errors = useSelector(state => state.authenticationError)

  function handleChange(event) {
    dispatch(CHANGE_LOGIN_FORM({
      ...loginData,
      [event.target.name]: event.target.value
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    axios
      .post('/users', loginData)
      .then(res => {
        const { token } = res.data
        localStorage.setItem('jwt', token)
        setAuthToken(token)
        const decoded = jwt_decode(token)
        dispatch(SET_CURRENT_USER(decoded))
      })
      .catch(err => dispatch(GET_ERRORS(err.response.data)))
  }

  return (
    <Page title={title}>
      <LinkStyled to="/"><HomeStyled/></LinkStyled>
      <LoginFormStyled onSubmit={ event => handleSubmit(event)}>
        <LabelStyled>
          Email
          <input name="email" type="text" placeholder="Email" value={loginData.email} onChange={event => handleChange(event)}/>
          <span>
            {errors.email}
            {errors.emailnotfound}
          </span>
        </LabelStyled>
        <LabelStyled>
          Password
          <input name="password" type="password" placeholder="Password" value={loginData.password} onChange={event => handleChange(event)}/>
          <span>
            {errors.password}
            {errors.passwordincorrect}
          </span>
        </LabelStyled>
        <ButtonStyled>Login</ButtonStyled>
      </LoginFormStyled>
      <p>Not registered yet?<LinkStyled to="/register" onClick={() => dispatch(GET_ERRORS({}))}>Register</LinkStyled></p>
    </Page>
  )
}

const LoginFormStyled = styled.form`
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
const HomeStyled = styled(Home)`
  height:35px;
  width: 35px;
`
const LinkStyled = styled(Link)`
  text-decoration: none;
`
