import { combineReducers } from 'redux'
import loginReducer from './loginReducer'
import registerReducer from './registerReducer'
import authenticationReducer from './authReducers'
import authenticationErrorReducer from './errorReducer'

const rootReducer = combineReducers({
  loginData: loginReducer,
  newUser: registerReducer,
  authentication: authenticationReducer,
  authenticationError: authenticationErrorReducer,
  
})

export default rootReducer