import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Button from './components/Button'
import Notification from './components/Notification'
import phoneBookService from './services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)

  useEffect(() => {
    phoneBookService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const nameChecker = (name) => {
    return persons.some(person => person.name === name)
  }

  const numberChecker = (number) => {
    return persons.some(person => person.number === number)
  }

  const addName = (event) => {
    event.preventDefault()

    const nameExists = nameChecker(newName)
    const numberExists = numberChecker(newNumber)

    if (nameExists && numberExists) {
      alert(`${newName} is already added to phonebook`)
    } else if (nameExists) {
      const confirmed = window.confirm(
        `${newName} is already added to phonebook. replace the old number?`
      )

      if (confirmed) {
        const existingPerson = persons.find((person) => person.name === newName)
        const updatedPerson = {...existingPerson, number: newNumber}

        phoneBookService
          .updatePerson(existingPerson.id, updatedPerson)
          .then((response) => {
            setPersons(
              persons.map((person) =>
                person.id === existingPerson.id ? response.data : person
              )
            )
            setNewName('')
            setNewNumber('')
          })
          .then(notification => {
            setNotificationMessage(
              `Phone number updated`
            )
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
          })
      }
    } else {
        const nameObject = {
          name: newName,
          number: newNumber
        }

      phoneBookService    
        .create(nameObject)    
        .then(response => {  
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')  
      })
        .then(notification => {
          setNotificationMessage(
            `Added ${newName}`
          )
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
    }
  }

  const removeName = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      phoneBookService
        .removePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .then(notification => {
          setNotificationMessage(
            `Removed ${name}`
          )
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
    }
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
      <Notification message={notificationMessage} />
        <Filter value={searchTerm} onChange={handleSearchChange} />
      <h2>add a new</h2>
        <PersonForm text="name:" inputValue={newName} eventTarget={handleNameChange} />
        <PersonForm text="number:" inputValue={newNumber} eventTarget={handleNumberChange} />
        <Button buttonAction={addName} buttonText="add" />

      <h2>Numbers</h2>
        <Persons personArray={filteredPersons} removeName={removeName} /> 
    </div>
  )
}

export default App