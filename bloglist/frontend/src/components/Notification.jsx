import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (notification === null) {
    return null
  }

  const notificationType = notification[1]
  const notificationMessage = notification[0]

  if (notificationType === 'success') {
    return <div className="addedBlog">{notificationMessage}</div>
  } else if (notificationType === 'error') {
    return <div className="error">{notificationMessage}</div>
  }
}

export default Notification
