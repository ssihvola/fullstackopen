const BlogForm = ({
  handleSubmit,
  title,
  author,
  url,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        title:
        <input value={title} onChange={handleTitleChange} />
      </div>
      <div>
        author: 
        <input value={author} onChange={handleAuthorChange} />
      </div>
      <div>
        url:
        <input value={url} onChange={handleUrlChange} />
      </div> 
      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm