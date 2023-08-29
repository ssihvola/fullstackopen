import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1231244' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }                  
  ]) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const nameChecker = (name) => {
    return persons.some(person => person.name === name)
  }

  const addName = (event) => {
    event.preventDefault()
    nameChecker(newName)
      ? alert(`${newName} is already added to phonebook`)
      : (() => {
        const nameObject = {
          name: newName,
          number: newNumber
        }

      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
      })()
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

return (
    <div>
      <h1>Phonebook</h1>
      <form>
        <div>filter shown with <input value={searchTerm} onChange={handleSearchChange} /></div>
      </form>

      <h2>add a new</h2>
      <form>
        <div>name: <input value={newName} onChange={handleNameChange} /></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
        <div><button onClick={addName}>add</button></div>
      </form>

      <h2>Numbers</h2>
        <div>
          {filteredPersons.map((person, index) => (
            <p key={index}>{person.name} {person.number}</p>
          ))}
        </div>
    </div>
  )
}

export default App