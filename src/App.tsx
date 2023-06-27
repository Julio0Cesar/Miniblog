import styles from '../src/styles/Global.scss'

import { BrowserRouter, Routes, Route, Navigate, Link, HashRouter } from 'react-router-dom'; 
import { onAuthStateChanged, User} from 'firebase/auth';
import { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';

import Home from './pages/home/Home';
import Nav from './components/navbar/Nav';
import About from './pages/about/About';
import Login from './pages/login/Login';
import CreateAccount from './pages/createAccount/CreateAccount';
import CreatePost from './pages/createPost/CreatePost';
import Profile from './pages/profile/Profile';
import E404 from './pages/404/E404';
import Post from './pages/post/Post';
import Search from './pages/search/Search';
import useAuthentication from './hooks/useAuthentication';
import EditPost from './pages/editPost/EditPost';



function App() {

  const [user, setUser] = useState <User | null | undefined>(undefined)
  const {auth} = useAuthentication()

  const loadingUser = user === undefined

  useEffect(()=>{
    onAuthStateChanged(auth, (user) =>{
      setUser(user)
    })
  }, [auth])
  if(loadingUser){
    return <p>Loading...</p>
  } 

  return (
    <div className={styles.App}>
    <AuthProvider value={ user }>
      <BrowserRouter>
          <Nav/>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/About' element={<About />} />
            <Route path='/Search' element={<Search />} /> 
            <Route path='/Post/:id' element={<Post />} />
            <Route path='/Login' element={!user ? <Login /> : <Navigate to='/' />} />
            <Route path='/CreateAccount' element={!user ? <CreateAccount /> : <Navigate to='/' />} />
            <Route path='/CreatePost' element={user ? <CreatePost /> : <Navigate to='/Login' />} />
            <Route path='/Profile' element={user ? <Profile /> : <Navigate to='/Login' />} />
            <Route path='/Post/Edit/:id' element={user ? <EditPost /> : <Navigate to='/Login' />} />
            
            <Route path='*' element={<E404 />} />
          </Routes>
        </BrowserRouter>
    </AuthProvider>
    </div>
  );
}

export default App;

