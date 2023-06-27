import { Link } from 'react-router-dom'
import { auth } from '../../firebase/config'
import useAuthentication from '../../hooks/useAuthentication'

import {useEffect, useState} from 'react'

import styles from './Login.module.scss'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [err, setErr] = useState<string | Error >('')
    
    const {login, err: authError, loading} = useAuthentication()

    const handleSubmit = async (e: any) =>{
      e.preventDefault()
    
    setErr('')
    const user = {
      email,
      password
    }
      await login(user)
      
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
                E-mail: 
                <input 
                    type='email'
                    name='email'
                    required
                    placeholder='E-mail'
                    onChange={(e)=> setEmail(e.target.value)}
                    value={email}
                />
            </label>
            <label>
                Password:
                <input 
                    type='password'
                    name='password'
                    autoComplete='off'
                    required
                    placeholder='Password'
                    onChange={(e)=> setPassword(e.target.value)}
                    value={password}
                />
            </label>      
            {loading && <button>Wait...</button>}
            {!loading && <button>Login</button>}
            {err instanceof Error && <p className={styles.err}>{err.message}</p>}
            <p>Create your Account <Link to='/CreateAccount'>Here</Link></p>

        </div>
    </form>
  )
}

export default Login