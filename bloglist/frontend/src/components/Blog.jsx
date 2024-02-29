import { useState } from 'react'
import { useDispatch } from 'react-redux'
import Button from './Button'
import { likeBlog } from '../reducers/blogReducer'

const Blog = ({ blog, handleRemove, user }) => {
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const removeBlog = () => {
    if (window.confirm(`delete blog ${blog.name} by ${blog.author}`)) {
      handleRemove(blog)
    }
  }

  return (
    <div className="blogStyle">
      <div className="blog">
        {blog.title} {blog.author}
        <button onClick={toggleVisibility} style={hideWhenVisible}>
          view
        </button>
        <button onClick={toggleVisibility} style={showWhenVisible}>
          hide
        </button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}
          <Button onClick={() => dispatch(likeBlog(blog))} buttonText="like" />
        </div>
        <div>{blog.user.name}</div>
        {blog.user.username === user.username && (
          <Button onClick={removeBlog} buttonText="remove" />
        )}
      </div>
    </div>
  )
}

export default Blog
