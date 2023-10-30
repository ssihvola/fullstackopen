const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
require('dotenv').config()

const Person = require('./models/person')

/* rekisteröidään virheidenkäsittelijämiddleware muiden middlewarejen rekisteröinnin jälkeen */
const errorHandler = (error, request, response, next) => {
  /* konsoliin tulostuu virheoliosta viestiosuus */
  console.error(error.message)

  /* jos on virheellinen olio-id, lähetetään pyynnön tehneelle selaimelle vastaus */
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  }

  /* siirretään next-funktiolla virheen käsittely expressin oletusarvosen virheidenkäsittelijän hoidettavaksi */
  next(error)
}

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

/* virheidenkäsittelijä käyttöön muiden middlewarejen rekisteröinnin jälkeen */
app.use(errorHandler)

let persons = [
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

  const person = new Person({
    name: body.name,
    number: body.number,
  })

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

  persons = persons.concat(person)

  person.save().then(savedPerson => {
    console.log(`added ${person.name} to phonebook`)
    res.json(savedPerson)
  })
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
    /* siirretään virheenkäsittely middlewaren hoidettavaksi */
    .catch(error => next(error))
})

app.get('/info', (req, res) => {
  res.send(info)
})

app.delete('/api/persons/:id', (req, res, next) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)
  res.status(204).end()

  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    /** virheidenkäsittely middlewarelle */
    .catch(error => next(error))
})

/* vaihdetaan olemassaolevan henkilön puhelinnumero */
app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body
  
  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatedPerson => {
      res.json(updatedPerson)
    })
    .catch(error => next(error))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

