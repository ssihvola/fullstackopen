import { useState } from 'react'
import Button from './Button'

import blogService from '../services/blogs'

const Blog = ({ blog, user, setUpdate }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = async (event) => {
    event.preventDefault()
    const likes = blog.likes + 1
    const updatedBlog = { ...blog, likes }
    await blogService.update(updatedBlog)
    setUpdate((prevUpdate) => prevUpdate + 1)
  }

  const handleRemove = async (event) => {
    event.preventDefault()

    if (window.confirm(`delete blog ${blog.name} by ${blog.author}`)) {
      blogService.setToken(user.token)
      await blogService.remove(blog.id, user.token)
      setUpdate((prevUpdate) => prevUpdate + 1)
    }
  }

  return (
    <div className="blogStyle">
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility} style={hideWhenVisible}>view</button>
        <button onClick={toggleVisibility} style={showWhenVisible}>hide</button>
      </div>
      <div style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}
          <Button buttonAction={handleLike} buttonText="like" />
        </div>
        <div>{blog.user.name}</div>
        <Button buttonAction={handleRemove} buttonText="remove" />
      </div>
    </div>
  )}

export default Blog