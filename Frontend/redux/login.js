const initialState = {
  isLoggedIn: false,
  userId : '',
  token: '',
  refreshToken: '',
  expiresOn: '',
  data: ''
}

import * as actionType from './ActionTypes'

export const login = (state = initialState, action) => {
  console.log(action)
  switch(action.type) {
      
      case actionType.SET_LOGIN_STATE:
          
          return {
              ...state, 
              ...action.payload,
              isLoggedIn: true,
          } 
          case actionType.SET_LOGOUT_STATE:
              isLoggedIn = action.payload.login;
              return {
                  ...state,
                  isLoggedIn,

              } 
      default: 
      return state;    
  }
}