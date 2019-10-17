import React from 'react'
import styled from 'styled-components/macro'
import { Link } from 'react-router-dom'
import Page from '../../common/Page'
import { useSelector, useDispatch } from 'react-redux'
import logo from '../../data/petshare.png'
import {
  CHANGE_LOGIN_FORM,
  SET_CURRENT_USER,
  GET_ERRORS
} from '../../actions/actions'
import axios from 'axios'
import { Home } from 'styled-icons/fa-solid/Home'
import setAuthToken from '../../utils/setAuthToken'
import jwt_decode from 'jwt-decode'


export default function LoginPage({ title }) {
  const dispatch = useDispatch()
  const loginData = useSelector(state => state.loginData)
  const errors = useSelector(state => state.authenticationError)

  function handleChange(event) {
    dispatch(
      CHANGE_LOGIN_FORM({
        ...loginData,
        [event.target.name]: event.target.value
      })
    )
  }

  function handleSubmit(event) {
    event.preventDefault()
    axios
      .post('/users/login', loginData)
      .then(_res => {
        const { token } = _res.data
        localStorage.setItem('jwt', token)
        setAuthToken(token)
        const decoded = jwt_decode(token)
        dispatch(SET_CURRENT_USER(decoded))
      })
      .catch(err => dispatch(GET_ERRORS(err.response.data)))
  }

  return (
    <Page title={logo}>
      <BoxStyled>
        <LoginFormStyled onSubmit={event => handleSubmit(event)}>
          <LabelStyled>
            Email
            <InputStyled
              name="email"
              type="text"
              value={loginData.email}
              onChange={event => handleChange(event)}
            />
            <span>
              {errors.email}
              {errors.emailnotfound}
            </span>
          </LabelStyled>
          <LabelStyled>
            Password
            <InputStyled
              name="password"
              type="password"
              value={loginData.password}
              onChange={event => handleChange(event)}
            />
            <span>
              {errors.password}
              {errors.passwordincorrect}
            </span>
          </LabelStyled>
          <ButtonStyled>Login</ButtonStyled>
        </LoginFormStyled>
        <p>
          Not registered yet?
          <LinkStyled to="/register" onClick={() => dispatch(GET_ERRORS({}))}>
            Register
          </LinkStyled>
        </p>
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

const LoginFormStyled = styled.form`

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
const HomeStyled = styled(Home)`
  height: 35px;
  width: 35px;
`
const LinkStyled = styled(Link)`
  text-decoration: none;
  color: var(--blue);
  padding-left: 5px;
`
