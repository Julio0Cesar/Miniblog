import { auth } from '../firebase/config'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
    UserCredential,
    User
} from 'firebase/auth'

import {useState, useEffect} from 'react'
import { Navigate } from 'react-router-dom'

const useAuthentication = () => {
  const [err, setErr] = useState<Error | undefined >()
  const [loading, setLoading] = useState(Boolean)
  const [cancelled, setCancelled] = useState(Boolean)

  //verify memory leak (vazamento)
  function checkIfIsCancelled(){
    if(cancelled){
      return
    }
  }

  //create user
  const createUser = async (data: {displayName: string, email:string, password: string}) =>{
    checkIfIsCancelled()

    setLoading(true)
    setErr(undefined)

    try {
        
        const userCredential: UserCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
        );

        const user: User = userCredential.user;

        await updateProfile(user, {
        displayName: data.displayName
        })

        setLoading(false)

    } catch (err) {
      let systemErrorMessage;
      if (typeof err === 'object' && err !== null && 'message' in err && typeof err.message === "string") {
        if (err.message.includes("Password")) {
          systemErrorMessage = "The password must have at least 6 characters."
        } else if (err.message.includes("email-already")) {
          systemErrorMessage = "Email already registered."
        } else if (err.message.includes("invalid-email")) {
          systemErrorMessage = "Invalid email address."
        } else {
          systemErrorMessage = "An error occurred, please try again later."
        }
      }

      setErr(new Error(systemErrorMessage))
      setLoading(false)
    }


  }

  //Logout user
  const logout = () =>{
    checkIfIsCancelled()

    signOut(auth)

  }

  //Login user
  const login = async (data: {email:string, password: string})=>{
    checkIfIsCancelled()

    setLoading(true)
    setErr(undefined)

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password)
      
      setLoading(false)
    } catch (err) {
      let systemErrorMessage;
      if (typeof err === 'object' && err !== null && 'message' in err && typeof err.message === "string") {
        console.log(err.message)
        if (err.message.includes("user-not-found")) {
          systemErrorMessage = "User Not Found."
        } else if (err.message.includes("wrong-password")) {
          systemErrorMessage = "Password is wrong."
        } else {
          systemErrorMessage = "An error occurred, please try again later."
        }
      }
      setErr(new Error(systemErrorMessage))
      setLoading(false)
    }
  }


useEffect(() =>{
    return () => setCancelled(true)
}, []) 

  return{
    auth,
    createUser,
    err,
    loading,
    logout,
    login
  }
}

export default useAuthentication