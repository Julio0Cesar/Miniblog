import { auth } from '../../firebase/config'
import useAuthentication from '../../hooks/useAuthentication'
import styles from './CreateAccount.module.scss'

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

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.formStyle}>
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
      </div>
    </form>
  )
}

export default CreateAccount