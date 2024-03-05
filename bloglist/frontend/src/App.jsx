import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import Notification from './components/Notification'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import NavBar from './components/NavBar'
import LoginForm from './components/LoginForm'
import User from './components/User'
import Users from './components/Users'
import { getBlogs } from './reducers/blogReducer'
import { userCredentials } from './reducers/loginReducer'
import { getUsers } from './reducers/userReducer'
import userService from './services/users'

const App = () => {
  const user = useSelector((state) => state.login)
  const users = useSelector((state) => state.users)
  const blogs = useSelector((state) => state.blogs)
  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUser = userService.getCredentials()
    if (loggedUser) {
      dispatch(userCredentials(loggedUser))
    }
    dispatch(getUsers())
    dispatch(getBlogs())
  }, [dispatch])

  if (user === null) {
    return <LoginForm />
  }

  return (
    <div>
      <NavBar user={user} dispatch={dispatch} />
      <Notification />
      <Routes>
        <Route path="/" element={<BlogForm blogs={blogs} />} />
        <Route path="/users" element={<Users users={users} />} />
        <Route path="/users/:id" element={<User users={users} />} />
        <Route path="blogs/:id" element={<Blog user={user} blogs={blogs} />} />
      </Routes>
    </div>
  )
}

export default App
