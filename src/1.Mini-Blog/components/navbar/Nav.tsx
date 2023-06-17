import { Link, NavLink, useLocation } from 'react-router-dom'
import { Auth, User } from 'firebase/auth'
import { useAuthValue } from '../../context/AuthContext'
import styles from './Nav.module.scss'

const Nav = () => {
  const user: User| null | undefined = useAuthValue()

  const location = useLocation()
  if(location.pathname === '/Portifolio/' ||location.pathname ==='/Portifolio/TodoList'){return null}

  return (
    <header>
      <nav className={styles.navContent}>
        <div className={styles.logo}>
          <NavLink to='/Portifolio/Home'>
            Mini <h1>BLOG</h1>
          </NavLink>
        </div>
        <div className={styles.navListItems}>
          <ul>
            <li> <NavLink to='/Portifolio/Home'
                  className={({ isActive }) => (isActive ? styles.active : "")}
                  >Home</NavLink> </li>
            <li> <NavLink to='/Portifolio/About'
                  className={({ isActive }) => (isActive ? styles.active : "")}
                  >About</NavLink> </li>
            {!user && (
              <>
                <li> <NavLink to='/Portifolio/Login'
                      className={({ isActive }) => (isActive ? styles.active : "")}
                      >Login</NavLink> </li>
              </>)} 
            {user &&(
              <>
              <li> <NavLink to='/Portifolio/Profile'
                    className={({ isActive }) => (isActive ? styles.active : "")}
                    >Profile</NavLink> </li>
              <li> <NavLink to='/Portifolio/CreatePost'
                    className={({ isActive }) => (isActive ? styles.active : "")}
                    >New Post</NavLink> </li>
              </> )}
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Nav