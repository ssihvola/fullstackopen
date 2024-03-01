import { useSelector } from 'react-redux'

const Users = () => {
  const users = useSelector((state) => state.users)

  console.log(users)

  return (
    <div>
    </div>
  )
}

export default Users
