import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import userService from '../services/users'
import { setNotification } from './notificationReducer'

const loginSlice = createSlice({
  name: 'login',
  initialState: null,
  reducers: {
    userCredentials(state, action) {
      return action.payload
    }
  }
})

export const { userCredentials } = loginSlice.actions

export const loginAction = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({
        username,
        password
      })
      userService.setCredentials(user)
      dispatch(userCredentials(user))
    } catch (error) {
      dispatch(setNotification('wrong username or password', 'error', 5000))
    }
  }
}

export const logoutAction = () => {
  return async dispatch => {
    userService.clearCredentials()
    dispatch(userCredentials(null))
  }
}

export default loginSlice.reducer