const express = require('express')
const app = express()

const persons = [
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

let now = new Date()

const info = `<p>phonebook has info of ${persons.length} people</p>
    <p>${now}</p>`

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/info', (req, res) => {
  res.send(info)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
