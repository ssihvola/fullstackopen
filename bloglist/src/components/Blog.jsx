import { useState } from 'react'
import Button from './Button'

const Blog = ({ blog, handleLike, handleRemove, user }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const addLike = () => {
    const likes = blog.likes + 1
    const updatedBlog = { ...blog, likes }
    handleLike(updatedBlog)
  }

  const removeBlog = () => {
    if (window.confirm(`delete blog ${blog.name} by ${blog.author}`)) {
      handleRemove(blog)
    }
  }

  return (
    <div className="blogStyle">
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility} style={hideWhenVisible}>view</button>
        <button onClick={toggleVisibility} style={showWhenVisible}>hide</button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}
          <Button onClick={addLike} buttonText="like" />
        </div>
        <div>{blog.user.name}</div>
        {blog.user.username === user.username &&
          <Button onClick={removeBlog} buttonText="remove" />
        }
      </div>
    </div>
  )
}

export default Blog