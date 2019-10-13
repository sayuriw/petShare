const registerReducer = (state = { name: '', email: '', password: '', repeatPassword: '' }, action) => {
  switch (action.type) {
    case 'CHANGE_SIGN_UP_FORM':
      return {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
        password: action.payload.password,
        repeatPassword: action.payload.repeatPassword
      }
    default:
      return state
  }
}

export default registerReducer