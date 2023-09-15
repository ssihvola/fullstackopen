const express = require('express')
const app = express()

app.use(express.json());

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
  res.json(persons)
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

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(person)

  res.json(person)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    res.json(person)
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

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
