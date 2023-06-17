import { Link, useLocation } from 'react-router-dom'
import { Auth, User } from 'firebase/auth'
import { useAuthValue } from '../../context/AuthContext'
import styles from './Nav.module.scss'

const Nav = () => {
  const user: User| null | undefined = useAuthValue()

  const location = useLocation()
  if(location.pathname === '/Portifolio/'){
    return null
  }else if(location.pathname ==='/Portifolio/TodoList'){
    return null
  }

  return (
    <header>
      <nav className={styles.navContent}>
        <div className={styles.logo}>
          <Link to='/Portifolio/Home'>
            Mini <h1>BLOG</h1>
          </Link>
        </div>
        <div className={styles.navListItems}>
          <ul>
            <li> <Link to='/Portifolio/Home'>Home</Link> </li>
            <li> <Link to='/Portifolio/About'>About</Link> </li>
            {!user && (
              <>
                <li> <Link to='/Portifolio/Login'>Login</Link> </li>
              </>)} 
            {user &&(
              <>
              <li> <Link to='/Portifolio/Profile'>Profile</Link> </li>
              <li> <Link to='/Portifolio/CreatePost'>New Post</Link> </li>
              </> )}
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Nav