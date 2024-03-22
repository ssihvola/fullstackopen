import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/users'

let token = null

const setCredentials = (user) => {
  window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
  token = user.token
}

const getCredentials = () => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      token = user.token
      return user
    }
}

const clearCredentials = () => {
  window.localStorage.clear()
  token = null
}

const getToken = () => token

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export default { setCredentials, getCredentials, clearCredentials, getToken, getAll }