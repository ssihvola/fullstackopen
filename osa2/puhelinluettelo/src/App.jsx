import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

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
        <Filter value={searchTerm} onChange={handleSearchChange} />

      <h2>add a new</h2>
        <PersonForm text="name:" inputValue={newName} eventTarget={handleNameChange} />
        <PersonForm text="number:" inputValue={newNumber} eventTarget={handleNumberChange} />
        <div><button onClick={addName}>add</button></div>

      <h2>Numbers</h2>
        <Persons personArray={filteredPersons} />
    </div>
  )
}

export default App