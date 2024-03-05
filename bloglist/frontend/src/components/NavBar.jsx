import { Link } from 'react-router-dom'
import Button from './Button'
import { logoutAction } from '../reducers/loginReducer'

const NavBar = ({ user, dispatch }) => {
  return (
    <div>
      <ul className="navBar">
        <li className="navBarElement">
          <Link to={'/'}>blogs</Link>
        </li>
        <li className="navBarElement">
          <Link to={'/users'}>users</Link>
        </li>
        <li className="navBarElement">
          {user.name} logged in
          <Button
            onClick={() => dispatch(logoutAction())}
            buttonText="log out"
          />
        </li>
      </ul>
      <h2>blogs</h2>
    </div>
  )
}

export default NavBar
