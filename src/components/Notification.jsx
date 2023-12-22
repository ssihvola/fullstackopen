const Notification = ({ message }) => {
  if (message === null) {
    return null
  } else if (message[0] === 'a') {
    return (
      <div className="addedBlog">
      {message}
      </div>
    )
  } else if (message[0] === 'w') {
    return (
      <div className="error">
        {message}
      </div>
    )
  } 
}

export default Notification