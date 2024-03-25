import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let container,
    setUpdate

  beforeEach(() => {
    const blog = {
      title: 'title',
      author: 'author',
      url: 'url',
      likes: 0,
      user: {
        name: 'abcdefg'
      }
    }

    setUpdate = jest.fn()
    container = render(<Blog blog={blog} handleLike={setUpdate} />).container
  })

  test('at start renders only title & author', () => {
    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, url, likes and name are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

  test('like button pressed twice calls event handler function twice', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('like')

    await user.click(button)
    await user.click(button)

    expect(setUpdate.mock.calls).toHaveLength(2)
  })
})

