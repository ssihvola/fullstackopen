const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})
})

describe('creating new users', () => {
  test('username too short', async () => {
    const newUser = {
      "username": "f",
      "name": "String",
      "password": "dddddddw"
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(response.body.error).toBe('username must be at least 3 characters')
  })

  test('password too short', async () => {
    const newUser = {
      "username": "dddddddf",
      "name": "String",
      "password": "1"
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(response.body.error).toBe('password must be at least 3 characters')
  })

  test('username and password with 3 characters pass', async () => {
    const newUser = {
      "username": "ddd",
      "name": "String",
      "password": "111"
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
  })

  test('not possible to create two users with same username', async () => {
    const initialUser = {
      "username": "ddd",
      "name": "String",
      "password": "111"
    }

    await api.post('/api/users').send(initialUser)

    const newUser = {
      "username": "ddd",
      "name": "String",
      "password": "111"
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(response.body.error).toBe('username already exists')
  })
})

afterAll(async () => {
  await mongoose.connection.close()
}) 