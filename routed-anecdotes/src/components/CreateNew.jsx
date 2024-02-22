import { useField } from "../hooks/index"
import { useNavigate } from "react-router-dom"

import Button from "./Button"

const CreateNew = ({ addNew, setNotification } ) => {
  const { reset: resetContent, ...content } = useField('text')
  const { reset: resetAuthor, ...author } = useField('text')
  const { reset: resetInfo, ...info } = useField('text')
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(content)
    addNew({
      content: content.value,
      author,
      info,
      votes: 0
    })
    setNotification(`a new anecdote ${content.value} created!`)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
    resetContent()
    resetAuthor()
    resetInfo()
    navigate('/')
  }

  const handleReset = (event) => {
    event.preventDefault()
    resetContent()
    resetAuthor()
    resetInfo()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <Button onClick={handleSubmit} text="create" />
        <Button onClick={handleReset} text="reset" />
      </form>
    </div>
  )
}

export default CreateNew