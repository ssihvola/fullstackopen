const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const listHelper = require('../utils/list_helper')

beforeEach(async () => {
  await api
    .post('/api/users')
    .send(listHelper.initialUser)

  const loginResponse = await api
    .post('/api/login')
    .send({
      username: listHelper.initialUser.username,
      password: listHelper.initialUser.password
  }) 

  listHelper.authHeader = `Bearer ${loginResponse.body.token}`

  await Blog.deleteMany({})
  let blogObject = new Blog(listHelper.initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(listHelper.initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('right amount of blogs', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(listHelper.initialBlogs.length)
})

test('id field is called id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('post request increases bloglist by one & title is correct', async () => {
  const newBlog = {
    "title": "email-gate",
    "author": "jari kulmala-kinnunen",
    "url": "http://ginnunen.blogspot.com",
    "likes": 0
  }

  await api
    .post('/api/blogs')
    .set('Authorization', listHelper.authHeader)
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => r.title)

  expect(response.body).toHaveLength(listHelper.initialBlogs.length + 1)
  expect(contents).toContain(
    'email-gate'
  )
})

test('likes: 0 if no value is given', async () => {
  const newBlog = {
    "title": "email-gate",
    "author": "jari kulmala-kinnunen",
    "url": "http://ginnunen.blogspot.com",
  }

  await api
    .post('/api/blogs')
    .set('Authorization', listHelper.authHeader)
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  expect(response.body[2].likes).toBe(0)
})

test('400 returned if title or url is missing', async () => {
  const newBlog = {
    "author": "jari kulmala-kinnunen",
  }

  await api
    .post('/api/blogs')
    .set('Authorization', listHelper.authHeader)
    .send(newBlog)
    .expect(400)
})

test('it is possible to get a single blog', async () => {
  await api
    .get(`/api/blogs/${listHelper.initialBlogs[0]._id}`)
    .expect(200)
})

test('it is possible to delete a blog', async () => {
  const newBlog = {
    "title": "email-gate",
    "author": "jari kulmala-kinnunen",
    "url": "http://ginnunen.blogspot.com",
  }

  await api
    .post('/api/blogs')
    .set('Authorization', listHelper.authHeader)
    .send(newBlog)

  let response = await api.get('/api/blogs')

  await api
    .delete (`/api/blogs/${response.body[2].id}`)
    .set('Authorization', listHelper.authHeader)
    .expect(204)

  response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(listHelper.initialBlogs.length)
})

test('it is possible to increase likes of a blog by one', async () => {
  const response = await api.get(`/api/blogs/${listHelper.initialBlogs[0]._id}`)
  response.body.likes++

  const updatedResponse = await api
    .put(`/api/blogs/${listHelper.initialBlogs[0]._id}`)
    .send(response.body)
    .expect(200)

  expect(updatedResponse.body.likes).toBe(listHelper.initialBlogs[0].likes + 1)
}) 

test('not possible to add a new blog without token', async () => {
  const newBlog = {
    "title": "email-gate",
    "author": "jari kulmala-kinnunen",
    "url": "http://ginnunen.blogspot.com",
    "likes": 0
  }

  const response = await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(401)
})

afterAll(async () => {
  await User.deleteMany({})
  await Blog.deleteMany({})
  await mongoose.connection.close()
}) 