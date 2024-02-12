import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    anecdotes: anecdoteReducer,
    filter: filterReducer
  }
})

console.log(store.getState())

export default store