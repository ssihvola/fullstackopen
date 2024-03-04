import { useParams } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'

const User = ({ users }) => {
  const id = useParams().id
  const user = users.find(u => u.id === id)

  if (!user) return null

  return (
    <div>
    <h3>{user.name}</h3>
    <p>added blogs</p>
      {user.blogs.map((blog) => (
        <ListGroup as="ul" key={blog.id}>
          <ListGroup.Item as="li">
            {blog.title}
          </ListGroup.Item>
        </ListGroup>
      ))}
      </div>
  )
}

export default User
