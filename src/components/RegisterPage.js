import React, { useState, useEffect } from 'react'
import styled from 'styled-components/macro'
import Page from '../common/Page'
import { Link, Redirect } from 'react-router-dom'
import logo from '../data/petshare.png'
import { postUser } from '../utils/userServices'

export default function Register({ title }) {
  
  const [registerError, setRegisterError] = useState('')
  const [registerEmail, setRegisterEmail] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [registerName, setRegisterName] = useState('')
  const [registerRepeatPassword, setRegisterRepeatPassword] = useState('')
  const [isCreated, setIsCreated] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    
    const registerData = {
      email: registerEmail,
      password: registerPassword,
      repeatedPassword: registerRepeatPassword,
      name: registerName
    }  
    postUser(registerData).then(json => {
      
      if (json.success) {
        setRegisterError(json.message)
        setRegisterEmail('')
        setRegisterPassword('')
        setRegisterName('')
        setRegisterRepeatPassword('')
        setIsCreated(true)
      } else {
        setRegisterError(json.message)
      }
    })
  }

  return (
    isCreated ? <Redirect exact to="/home" /> :
    <Page title={logo}>
      <BoxStyled>
        <p>
          Already have an Account?
          <LinkStyled exact to="/">Login</LinkStyled>
        </p>
        <ErrorMessageStyled>{registerError}</ErrorMessageStyled>
        <FormStyled onSubmit={event => handleSubmit(event)}>
          <LabelStyled>
            Name
            <InputStyled
              name="name"
              type="text"
              value={registerName}
              onChange={event => setRegisterName(event.target.value)}
            />
          </LabelStyled>
          <LabelStyled>
            Email
            <InputStyled
              name="email"
              type="text"
              value={registerEmail}
              onChange={event => setRegisterEmail(event.target.value)}
            />
          </LabelStyled>
          <LabelStyled>
            Password
            <InputStyled
              name="password"
              type="password"
              value={registerPassword}
              onChange={event => setRegisterPassword(event.target.value)}
            />
          </LabelStyled>
          <LabelStyled>
            Password
            <InputStyled
              name="repeatPassword"
              type="password"
              value={registerRepeatPassword}
              onChange={event => setRegisterRepeatPassword(event.target.value)}
            />
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
const ErrorMessageStyled = styled.p`
  color: red;
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

