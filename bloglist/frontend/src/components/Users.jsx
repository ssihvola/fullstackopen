import { useSelector } from 'react-redux'

const Users = () => {
  const users = useSelector((state) => state.users)

  if (users.length === 0) return null

  return (
    <div>
      <h2>users</h2>
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
        {users.map(user =>
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.blogs.length}</td>
          </tr>
        )}
        </tbody>
      </table>
    </div>
  )
}

export default Users
