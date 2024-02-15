import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import notificationReducer, { NotificationContext } from './components/NotificationContext'
import { getAnecdotes, updateAnecdote } from './requests'
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { useReducer } from 'react'

const App = () => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)
  const queryClient = useQueryClient()
  const result = useQuery(
    {
      queryKey: ['anecdotes'],
      queryFn: getAnecdotes,
      retry: false
    }
  )

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      notificationDispatch({ type: 'SHOW_NOTIFICATION', message: 'voted anecdote' })
      setTimeout(() => {
        notificationDispatch({ type: 'HIDE_NOTIFICATION' })
      }, 5000)
    }
  })

  if (result.status === 'error') {
    return <div>anecdote service not available due to problems in server</div>
  }

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  const anecdotes = result.data

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
  }

  return (
    <div>
      <h3>Anecdote app</h3>
    
      {notification && <Notification message={notification.message} />}
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
