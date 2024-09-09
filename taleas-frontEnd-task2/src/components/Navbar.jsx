import { Link, NavLink, useNavigate } from "react-router-dom"
import classes from './Navbar.module.css'

const Navbar = () => {
  const navigate = useNavigate()
  const handleLoginClick = () => {
    navigate('/login');
  };
  return (
    <nav className={classes.container}>
    <div className={classes.navOptions}>
      <h1>React Library</h1>

<ul>

<li>
  <NavLink to="/">
      Home
    </NavLink>
  </li>
  <li>
  <NavLink>
      Books
    </NavLink>
  </li>

  <li>
    <NavLink>
      People
    </NavLink>
  </li>

  <li>
    <NavLink>
      About
    </NavLink>
  </li>
</ul>
    </div>
    <button className={classes.loginBttn} onClick={handleLoginClick}>Log in</button>
    </nav>
  )
}

export default Navbar