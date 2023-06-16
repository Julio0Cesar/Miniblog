import { Link } from 'react-router-dom'
import styles from './NavBar.module.scss'

const NavBar = () => {
  return (
    <header>
      <nav className={styles.navContent}>
        <div className={styles.logo}>
          <Link to='/'>
            <h1>JÚLIO</h1> <span>CÉSAR OLIVEIRA RIOS</span> 
          </Link>
        </div>
        <div className={styles.navListItems}>
          <ul>
            <li> <Link to='/'>Home</Link> </li>
            <li> <Link to='/About'>Sobre</Link> </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default NavBar