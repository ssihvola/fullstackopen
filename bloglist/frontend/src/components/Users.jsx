import { useSelector, useDispatch } from 'react-redux'

const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)

  console.log(users)

  return (
    <div>
    </div>
  )
}

export default Users
