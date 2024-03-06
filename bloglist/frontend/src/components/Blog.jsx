import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import Button from './Button'
import { getBlogs, createComment, likeBlog, deleteBlog } from '../reducers/blogReducer'

const Blog = ({ user, blogs }) => {
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')
  const id = useParams().id
  const blog = blogs.find((b) => b.id === id)

  const handleComment = async (event) => {
    event.preventDefault()
    const newComment = {
      content: comment
    }
    dispatch(createComment(blog, newComment))
    dispatch(getBlogs())
    setComment('')
  }

  if (!blog) return null

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <div>{blog.url}</div>
      <div>
        likes {blog.likes}
        <Button onClick={() => dispatch(likeBlog(blog))} buttonText="like" />
      </div>
      <div>added by {blog.user.name}</div>
      {blog.user.username === user.username && (
        <Button
          onClick={() => dispatch(deleteBlog(blog, user))}
          buttonText="remove"
        />
      )}
      <h3>comments</h3>
      <form onSubmit={handleComment}>
        <input
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          id="comment"
        />
        <button id="create-comment" type="submit">
          add comment
        </button>
      </form>
      {blog.comments.map((comment) => (
        <div key={comment.id} className="blogComments">
          {comment.content}
        </div>
      ))}
    </div>
  )
}

export default Blog
