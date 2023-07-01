import { Link, NavLink, useLocation } from 'react-router-dom'
import { Auth, User } from 'firebase/auth'
import { useAuthValue } from '../../context/AuthContext'
import styles from './Nav.module.scss'
import { useState } from 'react'

const Nav = () => {
  const user: User| null | undefined = useAuthValue()
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation()

  if (location.pathname === '/CreatePost'){
    return null
  }
  if (location.pathname === '/Login'){
    return null
  }
  if (location.pathname === '/CreateAccount'){
    return null
  }

  const menuOnCLick = () => {
    setIsMenuOpen(!isMenuOpen);
    
  }
  return (
    <header>
      <nav className={styles.navContent}>
        <div className={styles.logo}>
          <NavLink to='/'>
            Mini <h1>BLOG</h1>
          </NavLink>
        </div>
        <div className={styles.hamburguer} onClick={menuOnCLick}>
          <i className="bi bi-list"></i>
        </div>
        <div className={`${styles.navListItems} ${isMenuOpen ? styles.showMenu : ''}`}>
          <ul>
            <li> <NavLink to='/'
                  className={({ isActive }) => (isActive ? styles.active : "")}
                  >Home</NavLink> </li>
            <li> <NavLink to='/About'
                  className={({ isActive }) => (isActive ? styles.active : "")}
                  >About</NavLink> </li>
            {!user && (
              <>
                <li> <NavLink to='/Login'
                      className={({ isActive }) => (isActive ? styles.active : "")}
                      >Login</NavLink> </li>
              </>)} 
            {user &&(
              <>
              <li> <NavLink to='/Profile'
                    className={({ isActive }) => (isActive ? styles.active : "")}
                    >Profile</NavLink> </li>
              <li> <NavLink to='/CreatePost'
                    className={({ isActive }) => (isActive ? styles.active : "")}
                    >New Post <i className="bi bi-plus-lg"></i></NavLink> </li>
              </> )}
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Nav