import { useState } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import blogService from '../services/blogs'
import loginService from '../services/login'
import Notification from './Notification'
import { setNotification } from '../reducers/notificationReducer'

const LoginForm = ({
  username,
  password,
  setUsername,
  setPassword,
  handleLogin
}) => {
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
            onChange={setUsername} />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            value={password}
            onChange={setPassword}
          />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm
