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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}