import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('form calls callback function with right info when creating a new blog', async () => {
    const user = userEvent.setup()
    const createBlog = jest.fn()

    const { container } = render(<BlogForm createBlog={createBlog} />)

    const titleInput = container.querySelector('#blog-title')
    const authorInput = container.querySelector('#blog-author')
    const urlInput = container.querySelector('#blog-url')
    const createButton = screen.getByText('create')

    await user.type(titleInput, 'valivalivali')
    await user.type(authorInput, 'jari')
    await user.type(urlInput, 'www.tykitellaan.fi')
    await user.click(createButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('valivalivali')
    expect(createBlog.mock.calls[0][0].author).toBe('jari')
    expect(createBlog.mock.calls[0][0].url).toBe('www.tykitellaan.fi')
  })
})