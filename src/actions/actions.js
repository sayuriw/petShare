// TRACK LOGIN & SIGN UP INPUT FIELDS
export const CHANGE_LOGIN_FORM = payload => {
  return {
    type: 'CHANGE_LOGIN_FORM',
    payload
  }
}

export const CHANGE_SIGN_UP_FORM = payload => {
  return {
    type: 'CHANGE_SIGN_UP_FORM',
    payload
  }
}

// USER AUTHENTICATION
export const SET_CURRENT_USER = payload => {
  return {
    type: 'SET_CURRENT_USER',
    payload
  }
}

export const GET_ERRORS = payload => {
  return {
    type: 'GET_ERRORS',
    payload
  }
}

