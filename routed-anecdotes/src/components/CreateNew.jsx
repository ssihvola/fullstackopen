import { useState } from "react"
import { useNavigate } from "react-router-dom"

import Button from "./Button"

const CreateNew = ({ addNew, setNotification } ) => {
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    addNew({
      content,
      author,
      info,
      votes: 0
    })
    setNotification(`a new anecdote ${content} created!`)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
    setContent('')
    setAuthor('')
    setInfo('')
    navigate('/')
  }

  const handleReset = (event) => {
    event.preventDefault()
    setContent('')
    setAuthor('')
    setInfo('')
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form>
        <div>
          content
          <input name='content' value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <div>
          author
          <input name='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div>
          url for more info
          <input name='info' value={info} onChange={(e)=> setInfo(e.target.value)} />
        </div>
        <Button onClick={handleSubmit} text="create" />
        <Button onClick={handleReset} text="reset" />
      </form>
    </div>
  )
}

export default CreateNew