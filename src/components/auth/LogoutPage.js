import React from 'react'
import { Redirect } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { SET_CURRENT_USER, CHANGE_LOGIN_FORM } from '../../actions/actions'

export default function LogoutPage() {
  const dispatch = useDispatch()
  if (window.confirm('Are you sure you want to Logout?')){
  
  dispatch(SET_CURRENT_USER(null))
  dispatch(CHANGE_LOGIN_FORM({
    email: '',
    password: ''
  }))
  localStorage.setItem('jwt', '')

  return <Redirect to="/" />
}
}
