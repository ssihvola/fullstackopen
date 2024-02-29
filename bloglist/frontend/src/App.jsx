import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Button from './components/Button'
import Notification from './components/Notification'
import { initializeBlogs, likeBlog } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'

import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'

const App = () => {
  const blogs = useSelector((state) => state.blogs)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [update, setUpdate] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [update])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      console.log('logging in with', username)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotification('wrong username or password', 'error', 5000))
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    window.localStorage.clear()
    setUser(null)
  }

  const handleRemove = async (blog) => {
    blogService.setToken(user.token)
    await blogService.remove(blog.id, user.token)
    setUpdate((prevUpdate) => prevUpdate + 1)
  }

  if (user === null) {
    return (
      <LoginForm
        username={username}
        password={password}
        handleLogin={handleLogin}
        setUsername={({ target }) => setUsername(target.value)}
        setPassword={({ target }) => setPassword(target.value)}
      />
    )
  }

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>
        {user.name} logged in
        <Button onClick={handleLogout} buttonText="log out" />
      </p>

      <BlogForm />

      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleRemove={handleRemove}
          user={user}
        />
      ))}
    </div>
  )
}

export default App
