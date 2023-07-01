import { Link } from 'react-router-dom'
import { auth } from '../../firebase/config'
import useAuthentication from '../../hooks/useAuthentication'
import styles from './CreateAccount.module.scss'
import BackImage from '../../assets/photo-1576503918400-0b982e6a98bf.png'
import {useEffect, useState} from 'react'

const CreateAccount = () => {

const [displayName, setDisplayName] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [confirmPassword, setConfirmPassword] = useState('')
const [err, setErr] = useState<string | Error >('')

const {createUser, err: authError, loading} = useAuthentication()

const handleSubmit = async (e: any) =>{
  e.preventDefault()

  setErr('')
  if(password !== confirmPassword){
      setErr(new Error("The password are not equals."))
    return
  }

const user = {
  displayName,
  email,
  password
}

  await createUser(user)
  
}
useEffect(()=>{
  if(authError){
    setErr(authError)
  }
}, [authError])

  return (/* 
    <div className={styles.container}>
      <div className={styles.page}>
        <div className={styles.imageLeft}>
            <img src={BackImage} />
          <div className={styles.image}>
          </div>
        </div>
        <div className={styles.formRight}>
            <div className={styles.return}>
              <p><Link to={'/Login'}>Return</Link></p>
          </div>
          <form onSubmit={handleSubmit} className={styles.form}>
            <h1>Create Account</h1>
              <label>
                Username:
                <input 
                  type='name'
                  name='usename'
                  required
                  placeholder='Username'
                  onChange={(e) => setDisplayName(e.target.value)}
                  value={displayName}
                />
              </label>
              <label>
                E-mail: 
                <input 
                  type='email'
                  name='email'
                  required
                  placeholder='E-mail'
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </label>
              <label>
                Password: 
                <input 
                  type='password'
                  name='password'
                  required
                  placeholder='Password'
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </label>
              <label>
                Confirm Password: 
                <input 
                  type='password'
                  name='confirmPassword'
                  required
                  placeholder='Confirm password'
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                />
              </label>
              {loading && <button>Wait...</button>}
              {!loading && <button>Create User</button>}
              {err instanceof Error && <p className={styles.err}>{err.message}</p>}
          </form>
        </div>
      </div>
    </div> */
    <div className={styles.container}>
    <div className={styles.page}>
      <div className={styles.imageLeft}>
        <div className={styles.image}>
            <img src={BackImage} />
        </div>
      </div>
      <div className={styles.formRight}>
          <div className={styles.return}>
            <p><Link to={'/'}>Return</Link></p>
          </div>
          <form onSubmit={handleSubmit} className={styles.form}>
            <h1>Create Account</h1>
              <label>
                Username:
                <input 
                  type='name'
                  name='usename'
                  required
                  placeholder='Username'
                  onChange={(e) => setDisplayName(e.target.value)}
                  value={displayName}
                />
              </label>
              <label>
                E-mail: 
                <input 
                  type='email'
                  name='email'
                  required
                  placeholder='E-mail'
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </label>
              <label>
                Password: 
                <input 
                  type='password'
                  name='password'
                  required
                  placeholder='Password'
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </label>
              <label>
                Confirm Password: 
                <input 
                  type='password'
                  name='confirmPassword'
                  required
                  placeholder='Confirm password'
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                />
              </label>
              {loading && <button>Wait...</button>}
              {!loading && <button>Create User</button>}
              {err instanceof Error && <p className={styles.err}>{err.message}</p>}
          </form>
      </div>
    </div>
  </div>
  )
}

export default CreateAccount