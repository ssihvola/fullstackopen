import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    }
  }
})

export const { appendBlog, setBlogs } = blogSlice.actions

export const getBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (content) => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch(appendBlog(newBlog))
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    await blogService.update({ ...blog, likes: blog.likes + 1 })
    dispatch(getBlogs())
  }
}

export const deleteBlog = (blog, user) => {
  if (window.confirm(`delete blog ${blog.name} by ${blog.author}`)) {
    return async dispatch => {
      await blogService.remove(blog.id, user.token)
      dispatch(getBlogs())
    }
  }
}

export default blogSlice.reducer