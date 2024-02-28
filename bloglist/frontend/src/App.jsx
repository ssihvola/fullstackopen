import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Button from './components/Button'
import Notification from './components/Notification'
import { setNotification } from './reducers/notificationReducer'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [addedBlogMessage, setAddedBlogMessage] = useState('')
  const [user, setUser] = useState(null)
  const [update, setUpdate] = useState(null)
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [update])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog))
    })

    dispatch(
      setNotification(
        `a new blog ${blogObject.title} by ${blogObject.author} added`,
        'success',
        5000,
      ),
    )
  }

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

  const handleLike = async (blog) => {
    try {
      await blogService.update(blog)
      setUpdate((prevUpdate) => prevUpdate + 1)
    } catch (error) {
      console.error('error updating likes:', error)
    }
  }

  const handleRemove = async (blog) => {
    blogService.setToken(user.token)
    await blogService.remove(blog.id, user.token)
    setUpdate((prevUpdate) => prevUpdate + 1)
  }

  const loginForm = () => (
    <LoginForm
      username={username}
      password={password}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
      handleSubmit={handleLogin}
    />
  )

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  if (user === null) {
    return (
      <div>
        <h2>blogs</h2>
        <Notification message={errorMessage} />
        <div>{loginForm()}</div>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>

      <Notification message={addedBlogMessage} />

      <p>
        {user.name} logged in
        <Button onClick={handleLogout} buttonText="log out" />
      </p>

      <div>{blogForm()}</div>

      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleLike={handleLike}
            handleRemove={handleRemove}
            user={user}
          />
        ))}
    </div>
  )
}

export default App
