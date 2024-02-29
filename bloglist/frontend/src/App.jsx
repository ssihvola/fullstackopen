import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import { initializeBlogs } from './reducers/blogReducer'
import { getCredentials } from './reducers/userReducer'

const App = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(getCredentials(user))
  }, [dispatch, user])

  if (user === null) {
    return <LoginForm />
  }

  return <BlogForm />
}

export default App
