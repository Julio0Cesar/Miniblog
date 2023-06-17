import React from 'react'
import styles from './Footer.module.scss'

function Footer() {
  return (
    <div className={styles.container}>
        <footer className={styles.footer}>
        <p>
            <span>React + TS Todo</span> @2023
        </p>
        </footer>
    </div>
  )
}

export default Footer