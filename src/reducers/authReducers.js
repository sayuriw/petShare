const isEmpty = require('is-empty');

export const initialState = {
  isAuthenticated: false,
  user: {}
}

const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      }
    default:
      return state
  }
}

export default authenticationReducer