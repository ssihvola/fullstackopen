import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from './components/Button'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Users from './components/Users'
import { getBlogs } from './reducers/blogReducer'
import { getCredentials, logoutAction } from './reducers/loginReducer'
import { getUsers } from './reducers/userReducer'

const App = () => {
  const user = useSelector((state) => state.login)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getBlogs())
    dispatch(getCredentials(user))
  }, [])

  useEffect(() => {
    if (user) {
      dispatch(getUsers())
    }
  }, [])

  if (user === null) {
    return <LoginForm />
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>
        {user.name} logged in
        <Button onClick={() => dispatch(logoutAction())} buttonText="log out" />
      </p>
      <BlogForm />
      <Users />
    </div>
  )
}

export default App
