import { useState } from 'react'
import { useDispatch } from 'react-redux'

import Notification from './Notification'
import { setNotification } from '../reducers/notificationReducer'
import { loginAction } from '../reducers/userReducer'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(loginAction(username, password))
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />

      <form onSubmit={handleLogin} id="login-form">
        <div>
          username
          <input
            id="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
