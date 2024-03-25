const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', 
  middleware.tokenExtractor,
  middleware.userExtractor,
  async (request, response) => {
    const body = request.body
    const user = request.user

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })

    if (blog.likes === undefined) {
      blog.likes = 0
    } 
    
    if (blog.title === undefined || blog.url === undefined) {
      return response.status(400).end()
    }

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog)
    await user.save()
    response.json(savedBlog)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).json(blog)
  }
})

blogsRouter.delete('/:id', 
  middleware.tokenExtractor,
  middleware.userExtractor,
  async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    const user = request.user

    if ( blog.user.toString() === user.id.toString() ) {
      await Blog.findByIdAndDelete(request.params.id)
      console.log('blog deleted')
      return response.status(204).end()
    } else {
      return response.status(403).json({ error: 'forbidden' })
    }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const updatedBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  try {
    const blog = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, { new: true })
    response.json(blog)
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter