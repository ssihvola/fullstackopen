const _ = require('lodash')

const dummy = (blogs) => {
  return blogs.length - blogs.length + 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  const favorite = blogs.reduce((prev, current) => {
    return (prev.likes > current.likes) ? prev : current
  })

  return favorite
}

const mostBlogs = (blogs) => {
  const authors = _.groupBy(blogs, 'author')
  const mostBlogs = _.maxBy(Object.keys(authors), author => authors[author].length)

  return {
    author: mostBlogs,
    blogs: authors[mostBlogs].length
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}