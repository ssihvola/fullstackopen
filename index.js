const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
require('dotenv').config()

const Person = require('./models/person')

morgan.token('body', (req, res) => JSON.stringify(req.body))

app.use(express.json())
app.use(express.static('dist'))
app.use(cors())

app.use((req, res, next) => {
  if (req.method === 'POST') {
    morgan(':method :url :status :res[content-length] :body')(req, res, next)
  } else {
    morgan('tiny')(req, res, next)
  }
})

let persons = [
  {
    id: 1,
    name: "arto hellas",
    number: "040-123456"
  },
  {
    id: 2,
    name: "ada lovelace",
    number: "39-44-5323523"
  },
  {
    id: 3,
    name: "dan abramov",
    number: "12-234-34353535"
  },
  {
    id: 4,
    name: "mary poppendick",
    number: "390-23234-234234"
  }
]

const now = new Date()

const info = `<p>phonebook has info of ${persons.length} people</p>
    <p>${now}</p>`

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
})

const generateId = () => {
  const min = 1
  const max = 100000000
  const newId = Math.floor(Math.random() * (max - min + 1)) + min
  return newId
}

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'content missing'
    })
  }

  const nameChecker = persons.filter(person => person.name === body.name)

  if (nameChecker.length > 0) {
    return res.status(400).json({
      error: 'name already in phonebook'
    })
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(person)

  person.save().then(savedPerson => {
    res.json(savedPerson)
  })
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    Person.findById(req.params.id).then(person => {
      res.json(person)
    })
  } else {
    res.status(404).end()
  }
})

app.get('/info', (req, res) => {
  res.send(info)
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)
  res.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

