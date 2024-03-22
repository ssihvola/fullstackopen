/* eslint-disable react/prop-types */
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ content, votes, handleClick }) => {
  return (
    <div>
      <div>
        {content}
      </div>
      <div>
        has {votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => {
    if ( state.filter === '' ) {
      return state.anecdotes
    } else {
      return state.anecdotes.filter(a => 
        a.content.toLowerCase()
        .includes(state.filter.toLowerCase()))
    }
  })

  const sortedAnecdotes = [...anecdotes]
    .sort((a , b) => b.votes - a.votes)

  const handleVote = (anecdote) => {
    dispatch(voteAnecdote(anecdote))
    dispatch(setNotification(`voted ${anecdote.content}`, 5000))
  }

  return (
    <div>
      {sortedAnecdotes
        .map(anecdote =>
          <Anecdote
            key={anecdote.id}
            content={anecdote.content}
            votes={anecdote.votes}
            handleClick={() => handleVote(anecdote)} 
          />
        )
      }
    </div>
  )
}

export default AnecdoteList