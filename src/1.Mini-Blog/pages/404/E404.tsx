import styles from './E404.module.scss'

const E404 = () => {
  return (
    <div className={styles.errorPage}>
      <h1>ERROR 404</h1>
      <p>Page not found for now</p>
    </div>
  )
}

export default E404