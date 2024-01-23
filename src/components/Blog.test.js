import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let container
  let mockHandler

  beforeEach(() => {
    const blog = {
      title: 'title',
      author: 'author',
      url: 'url',
      user: {
        name: 'abcdefg'
      }
    }

    mockHandler = jest.fn()

    container = render(
      <Blog blog={blog} onClick={mockHandler} />).container
  })

  test('renders title & author', () => {
    screen.getByText('title author')
  })

  test('shows url, likes and name after clicking the button', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.togglableContent')
    expect(div).toHaveTextContent('urllikes likeabcdefgremove')
  })
})

