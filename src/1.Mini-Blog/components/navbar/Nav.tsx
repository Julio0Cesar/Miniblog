import { Link } from 'react-router-dom'
import { Auth, User } from 'firebase/auth'
import { useAuthValue } from '../../context/AuthContext'
import styles from './Nav.module.scss'

const Nav = () => {
  const user: User| null | undefined = useAuthValue()


  return (
    <header>
      <nav className={styles.navContent}>
        <div className={styles.logo}>
          <Link to='/'>
            Mini <h1>BLOG</h1>
          </Link>
        </div>
        <div className={styles.navListItems}>
          <ul>
            <li> <Link to='/'>Home</Link> </li>
            <li> <Link to='/About'>About</Link> </li>
            {!user && (
              <>
                <li> <Link to='/Login'>Login</Link> </li>
              </>)} 
            {user &&(
              <>
              <li> <Link to='/Profile'>Profile</Link> </li>
              <li> <Link to='/CreatePost'>New Post</Link> </li>
              </> )}
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Nav