import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../requests"
import { useReducer } from 'react'
import Notification from "./Notification"
import notificationReducer from './NotificationContext'

const AnecdoteForm = () => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      notificationDispatch({ type: 'SHOW_NOTIFICATION', message: 'new anecdote added' })
      setTimeout(() => {
        notificationDispatch({ type: 'HIDE_NOTIFICATION' })
      }, 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    if (content.length >= 5) {
      newAnecdoteMutation.mutate({ content, votes: 0})
    }
  }

  return (
    <div>
      {notification && <Notification message={notification.message} />}
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm