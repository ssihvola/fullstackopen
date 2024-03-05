import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import Button from './Button'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'

const Blog = ({ user, blogs }) => {
  const dispatch = useDispatch()

  const id = useParams().id
  const blog = blogs.find((b) => b.id === id)

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
      {blog.comments.map((comment) => (
        <div key={comment.id} className="blogComments">
          {comment.content}
        </div>
      ))}
    </div>
  )
}

export default Blog
