import {  NavLink, useNavigate } from "react-router-dom"
import classes from './Navbar.module.css'

const Navbar = () => {
  const navigate = useNavigate()


  const isLoggedIn = !!localStorage.getItem('accessToken');

  const handleAuthClick = () => {
    if (isLoggedIn) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('isAdmin')
      navigate('/');
    } else {
      // Redirect to the login page
      navigate('/login');
    }
  };
  return (
    <nav className={classes.container}>
    <div className={classes.navOptions}>
      <h1>React Library</h1>

<ul>

<li>
  <NavLink to="/" className={({ isActive }) => isActive ? classes.activeLink : undefined}>
      Home
    </NavLink>
  </li>
  <li>
  <NavLink to="/books" className={({ isActive }) => isActive ? classes.activeLink : undefined}>
      Books
    </NavLink>
  </li>

  <li>
    <NavLink to="/publicFigures" className={({ isActive }) => isActive ? classes.activeLink : undefined}>
      Public Figures
    </NavLink>
  </li>

  <li>
    <NavLink to="/about" className={({ isActive }) => isActive ? classes.activeLink : undefined}>
      About
    </NavLink>
  </li>
</ul>
    </div>
    <button className={classes.loginBttn} onClick={handleAuthClick}>
        {isLoggedIn ? 'Log out' : 'Log in'}
      </button>
    </nav>
  )
}

export default Navbar