import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from './components/Button'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Users from './components/Users'
import { getBlogs } from './reducers/blogReducer'
import { logoutAction, userCredentials } from './reducers/loginReducer'
import { getUsers } from './reducers/userReducer'
import userService from './services/users'

const App = () => {
  const user = useSelector((state) => state.login)
  const dispatch = useDispatch()

  console.log(user)

  // sivua päivittäessä user palattaa ensin nullin, sitten oikean olion
  // sama users-taulukon kanssa, ensin palauttaa tyhjän, sitten oikean

  useEffect(() => {
    const loggedUser = userService.getCredentials()
    if (loggedUser) {
      dispatch(userCredentials(loggedUser))
      dispatch(getUsers())
      dispatch(getBlogs())
    }
  }, [dispatch])

  if (user === null) {
    return <LoginForm />
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>
        {user.name} logged in
        <Button onClick={() => dispatch(logoutAction())} buttonText="log out" />
      </p>
      <BlogForm />
      <Users />
    </div>
  )
}

export default App
