import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import loginService from '../services/login'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    userCredentials(state, action) {
      return action.payload
    }
  }
})

export const { userCredentials } = userSlice.actions

export const getCredentials = (user) => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
    }
    dispatch(userCredentials(user))
  }
}

export const loginAction = (username, password) => {
  return async dispatch => {
    const user = await loginService.login({
      username,
      password
    })

    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    blogService.setToken(user.token)
    dispatch(userCredentials(user))
  }
}

export const logoutAction = () => {
  return async dispatch => {
    window.localStorage.clear()
    dispatch(userCredentials(null))
  }
}

export default userSlice.reducer