import React from 'react'
import { Redirect } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { initialState } from '../../reducers/authReducers'
import { SET_CURRENT_USER } from '../../actions/actions'

export default function LogoutPage() {
  const dispatch = useDispatch()
  dispatch(SET_CURRENT_USER(initialState))
  localStorage.setItem('jwt', '')

  return <Redirect to="/" />
}
