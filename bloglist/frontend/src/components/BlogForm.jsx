import { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Link } from 'react-router-dom'
import Togglable from './Togglable'

const BlogForm = ({ blogs }) => {
  const ref = useRef()
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

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

  return (
    <div>
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
        <div key={blog.id} className="blogList">
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </div>
      ))}
    </div>
  )
}

export default BlogForm
