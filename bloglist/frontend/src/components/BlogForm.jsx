import { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

import Blog from './Blog'
import Button from './Button'
import Notification from './Notification'
import Togglable from './Togglable'

const BlogForm = ({ user, handleLogout }) => {
  const blogs = useSelector((state) => state.blogs)
  const ref = useRef()
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const handleSubmit = async (event) => {
    event.preventDefault()
    ref.current.toggleVisibility()
    const newBlog = { title, author, url }
    setTitle('')
    setAuthor('')
    setUrl('')
    dispatch(createBlog(newBlog))
    dispatch(
      setNotification(
        `a new blog ${newBlog.title} by ${newBlog.author} added`,
        'success',
        5000,
      ),
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

      <Togglable buttonLabel="new blog" ref={ref}>
        <div className="formDiv">
          <h2>create new</h2>

          <form onSubmit={handleSubmit} ref={ref}>
            <div>
              title
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                id="blog-title"
              />
            </div>
            <div>
              author
              <input
                value={author}
                onChange={(event) => setAuthor(event.target.value)}
                id="blog-author"
              />
            </div>
            <div>
              url
              <input
                value={url}
                onChange={(event) => setUrl(event.target.value)}
                id="blog-url"
              />
            </div>
            <button id="create-blog" type="submit">
              create
            </button>
          </form>
        </div>
      </Togglable>

      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
        />
      ))}
    </div>
  )
}

export default BlogForm
