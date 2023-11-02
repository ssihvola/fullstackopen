const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()

const Person = require('./models/person')

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  next(error)
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint '})
}

app.use(cors())
app.use(express.json())

morgan.token('body', (req, res) => JSON.stringify(req.body))

app.use((req, res, next) => {
  if (req.method === 'POST') {
    morgan(':method :url :status :res[content-length] :body')(req, res, next)
  } else {
    morgan('tiny')(req, res, next)
  }
})

app.use(express.static('dist'))

let persons = []

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  const nameChecker = persons.filter(person => person.name === body.name)

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'content missing'
    })
  } else if (nameChecker.length > 0) {
    return res.status(400).json({
      error: 'name already in phonebook'
    })
  } 

  persons = persons.concat(person)

  person.save()
    .then(savedPerson => {
      console.log(`added ${person.name} to phonebook`)
      res.json(savedPerson)
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)

  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      } 
    })
    .catch(error => next(error))
})

const generateId = () => {
  const min = 1
  const max = 100000000
  const newId = Math.floor(Math.random() * (max - min + 1)) + min
  return newId
}

app.get('/info', (req, res) => {
  Person.find({}).then(persons => {
    const personList = persons
    const now = new Date()
    const info = `<p>phonebook has info of ${personList.length} people</p>
    <p>${now}</p>`
    res.send(info)
  })
  .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)
  res.status(204).end()

  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body
  
  Person.findByIdAndUpdate(
    req.params.id, 
    { name, number }, 
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedPerson => {
      res.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

