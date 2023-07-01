import { Link, useLocation } from 'react-router-dom'
import styles from './Footer.module.scss'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'

const Footer = () => {
  const {documents: posts, loading} = useFetchDocuments("posts")
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
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>
          <Link to='/'>
            Mini <h1>BLOG</h1>
          </Link>
        </div>
      <div className={styles.totalPosts}>
        Total posts = {posts.length} <i className="bi bi-circle-fill"></i>
      </div>
      <div className={styles.links}>
        <span>by Kintz</span><p>
          <a href='https://github.com/Kintiz'>Github</a>
        </p>
        <span className={styles.bar}>|</span>
        <p>
          <a href="https://www.linkedin.com/in/julio-cesar-rios/">Linkedin</a>
        </p>
      </div>
    </footer>
  )
}

export default Footer