const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

const initialUser = {
  "username": "abcdefg",
  "name": "String",
  "password": "123456"
}

beforeEach(async () => {
  await User.deleteMany({})
  let userObject = new User(initialUser)
  await userObject.save()
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
      "username": "abc",
      "name": "String",
      "password": "123"
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
  })

  test('not possible to create two users with same username', async () => {
    const newUser = {
      "username": "abcdefg",
      "name": "String",
      "password": "123456"
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(response.body.error).toBe('username already exists')
  })

describe('user info', () => {
  test('blog has info about user who added it', async () => {

  })
})
})

afterAll(async () => {
  await User.deleteMany({})
  await mongoose.connection.close()
}) 