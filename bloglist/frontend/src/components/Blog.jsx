import { useState } from 'react'
import { useDispatch } from 'react-redux'
import Button from './Button'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'

const Blog = ({ blog, user }) => {
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  return (
    <div className="blogStyle">
      <div className="blog">
        {blog.title} {blog.author}
        <button onClick={() => setVisible(!visible)} style={hideWhenVisible}>
          view
        </button>
        <button onClick={() => setVisible(!visible)} style={showWhenVisible}>
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
          <Button onClick={() => dispatch(deleteBlog(blog, user))} buttonText="remove" />
        )}
      </div>
    </div>
  )
}

export default Blog
