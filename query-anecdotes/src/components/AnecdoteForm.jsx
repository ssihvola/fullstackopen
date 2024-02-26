import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../requests"
import { useNotificationDispatch, setNotification } from './NotificationContext'

const AnecdoteForm = () => {
  const notificationDispatch = useNotificationDispatch()
  const queryClient = useQueryClient()

  const handleNotification = (message) => {
    notificationDispatch(setNotification(message))
    setTimeout(() => {
      notificationDispatch(setNotification(null))
    }, 5000)
  }
  
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      handleNotification('new anecdote added')
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    if (content.length >= 5) {
      newAnecdoteMutation.mutate({ content, votes: 0})
    } else {
      handleNotification('anecdote too short, must have length 5 or more')
    }
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm