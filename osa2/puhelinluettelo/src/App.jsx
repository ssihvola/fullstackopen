import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')
  const nameChecker = (name) => {
    return persons.some(person => person.name === name)
  }

  const addName = (event) => {
    event.preventDefault()
    nameChecker(newName)
      ? alert(`${newName} is already added to phonebook`)
      : (() => {
        const nameObject = {
          name: newName
        }

      setPersons(persons.concat(nameObject))
      setNewName('')
      })()
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button onClick={addName}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        <div>
          {persons.map((person, index) => (
            <p key={index}>{person.name}</p>
          ))}
        </div>
    </div>
  )

}

export default App