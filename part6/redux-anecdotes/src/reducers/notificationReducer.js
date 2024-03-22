import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    getNotification(state, action) {
      return action.payload
    },
    clearNotification() {
      return null
    }
  }
})

export const { getNotification, clearNotification } = notificationSlice.actions

export const setNotification = (message, time) => {
  return dispatch => {
    dispatch(getNotification(message))
    setTimeout(() => {
      dispatch(clearNotification())
    }, time)
  }
}

export default notificationSlice.reducer