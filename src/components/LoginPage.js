import React, { useState, useEffect }from 'react'
import styled from 'styled-components/macro'
import { Link, Redirect } from 'react-router-dom'
import Page from '../common/Page'
import logo from '../data/petshare.png'
import { Home } from 'styled-icons/fa-solid/Home'
import { fetchUserLogin, setToStorage, getFromStorage } from '../utils/userServices'

export default function LoginPage() {

  const [token, setToken] = useState('')
  const [loginError, setLoginError] = useState('')
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [isCreated, setIsCreated] = useState(false)
  
  useEffect(() => {
    console.log('TEST')
    const obj = getFromStorage('user')
    //console.log('token', obj)
      fetch('/users/verify?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            setToken(obj)
            console.log(token)
          } else {
            setLoginError()
          }
        })
      
  }, [])

  function handleSubmit(event) {
    event.preventDefault()
    

    const LoginData = {
      email: loginEmail,
      password: loginPassword
    }
    

    fetchUserLogin(LoginData).then(json => {
      console.log('json', json) ////console log if login successfull
      if (json.success) {
        setToStorage('user', { token: json.token})
        // setToStorage('userId', { userId: json.userId})
        setLoginError(json.message)
        setLoginPassword('')
        setLoginEmail('')
        setToken(json.token)
        setIsCreated(true)
      } else {
        setLoginError(json.message)
      }
    }) 
        
    }
    
  return (
    isCreated ? <Redirect to="/home" /> :
    <Page title={logo}>
      <BoxStyled>
        <ErrorMessageStyled>{loginError}</ErrorMessageStyled>
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
          <LinkStyled to="/register" >
            Register
          </LinkStyled>
        </p>
        <ButtonStyled onclick={event => logout(event)}>Logout</ButtonStyled>
      </BoxStyled>
    </Page>
  )
  function onTextboxChangeLoginEmail(event) {
    setLoginEmail(event.target.value)
  }

  function onTextboxChangeLoginPassword(event) {
    setLoginPassword(event.target.value)
  }
  function logout() {
      console.log('test')
      fetch('users/logout?token=' + token)
        .then(res => res.json())
        .then(json => {
          console.log('json', json) //console log if logout successfull
            setToken('')
          }) 
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
  color: #83b0ea;
  padding-left: 5px;
`