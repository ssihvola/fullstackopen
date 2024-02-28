import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    createNotification(state, action) {
      return action.payload
    },
  },
})

export const { createNotification } = notificationSlice.actions

export const setNotification = (content, type, time) => {
  return dispatch => {
    dispatch(createNotification([ content, type ]))
    setTimeout(() => {
      dispatch(createNotification(null))
    }, time)
  }
}

export default notificationSlice.reducer
