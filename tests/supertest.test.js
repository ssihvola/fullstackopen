const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
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
  expect(response.body).toHaveLength(initialBlogs.length)
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
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => r.title)

  expect(response.body).toHaveLength(initialBlogs.length + 1)
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
    .send(newBlog)
    .expect(201)
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
    .send(newBlog)
    .expect(400)
})

test('it is possible to get a single blog', async () => {
  await api
    .get(`/api/blogs/${initialBlogs[0]._id}`)
    .expect(200)
})

test('it is possible to delete a blog', async () => {
  await api
    .delete (`/api/blogs/${initialBlogs[0]._id}`)
    .expect(204)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length - 1)
})

afterAll(async () => {
  await mongoose.connection.close()
}) 