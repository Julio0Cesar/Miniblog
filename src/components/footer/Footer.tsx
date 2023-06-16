import { useLocation } from 'react-router-dom'
import styles from './Footer.module.scss'

const Footer = () => {
  const location = useLocation()
  if(location.pathname !== "/"){
    return null
  }
  return (
    <>
    </>
  )
}

export default Footer