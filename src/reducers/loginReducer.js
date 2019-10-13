const loginReducer = (state = { email: '', password: '' }, action) => {
  switch (action.type) {
    case 'CHANGE_LOGIN_FORM':
      return {
        ...state,
        email: action.payload.email,
        password: action.payload.password
      }
    default:
      return state
  }
}

export default loginReducer