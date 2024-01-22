import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  test('renders title & author', () => {
    const blog = {
      title: 'title',
      author: 'author',
      url: 'url',
      user: {
        name: 'abcdefg'
      }
    }

    render(<Blog blog={blog} />)

    const element = screen.getByText('title author')
    expect(element).toBeDefined()
  })
})

