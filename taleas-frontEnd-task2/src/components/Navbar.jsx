import { NavLink, useNavigate } from "react-router-dom";
import classes from "./Navbar.module.css";
import { useUser } from "../context/UserContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useUser();

  const isLoggedIn = !!user;

  const handleAuthClick = async () => {
    if (isLoggedIn) {
      await logout(); 
      navigate("/");  
    } else {
      navigate("/login");
    }
  };

  return (
    <nav className={classes.container}>
      <div className={classes.navOptions}>
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? classes.activeLink : undefined)}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/books"
              className={({ isActive }) => (isActive ? classes.activeLink : undefined)}
            >
              Books
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/publicFigures"
              className={({ isActive }) => (isActive ? classes.activeLink : undefined)}
            >
              Public Figures
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? classes.activeLink : undefined)}
            >
              About
            </NavLink>
          </li>

          {isLoggedIn && (
        <li>
        <NavLink
          to={`/profile/user/${user.id}`}
          className={({ isActive }) => (isActive ? classes.activeLink : undefined)}
        >
          My Profile
        </NavLink>
        </li>
 
      )}
        </ul>

        <button className={classes.loginBttn} onClick={handleAuthClick}>
        {isLoggedIn ? "Log out" : "Log in"}
      </button>
      </div>


    </nav>
  );
};

export default Navbar;
