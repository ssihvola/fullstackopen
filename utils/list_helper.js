const _ = require('lodash')

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

const initialUser = {
  "username": "abcdefg",
  "name": "String",
  "password": "123456"
}

let authHeader

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

const mostLikes = (blogs) => {
  const authors = _.groupBy(blogs, 'author')
  const authorWithMostLikes = _.maxBy(Object.keys(authors), (author) =>
    _.sumBy(authors[author], 'likes')
  )

  return {
    author: authorWithMostLikes,
    likes: _.sumBy(authors[authorWithMostLikes], 'likes')
  }
}

module.exports = {
  initialBlogs,
  initialUser,
  authHeader,
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}