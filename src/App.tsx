import styles from '../src/styles/Global.scss'

import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom'; 
import First from './pages/home/First'/* 
import NavBar from './components/navbar/NavBar' *//* 
import Home from './Blog/pages/home/Home';
import Nav from './Blog/components/navbar/Nav';
import About from './Blog/pages/about/About';
import Login from './Blog/pages/login/Login';
import CreateAccount from './Blog/pages/createAccount/CreateAccount';
import CreatePost from './Blog/pages/createPost/CreatePost';
import Profile from './Blog/pages/profile/Profile';
import E404 from './Blog/pages/404/E404';
 */
import { onAuthStateChanged, User} from 'firebase/auth';

import { useState, useEffect } from 'react';/* 
import Footer from './components/footer/Footer' */;
/* 
import { AuthProvider } from './Blog/context/AuthContext';
import useAuthentication from './Blog/hooks/useAuthentication';
import Footer from './components/footer/Footer';
import TodoList from './TodoList/TodoList';
import Search from './pages/Search/Search';
import Post from './Blog/pages/post/Post'; */


function App() {
/* 
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
  } */

  return (
    <div className={styles.App}>{/* 
    <AuthProvider value={ user }> */}
      <BrowserRouter>{/* 
          <Nav/> */}
          <Routes>
            <Route path='/' element={<First />} />{/* 
            <Route path='/Home' element={<Home />} />
            <Route path='/About' element={<About />} />
            <Route path='/Search' element={<Search />} />
            <Route path='/Post/:id' element={<Post />} />
            <Route path='/Login' element={!user ? <Login /> : <Navigate to='/Home' />} />
            <Route path='/CreateAccount' element={!user ? <CreateAccount /> : <Navigate to='/Home' />} />
            <Route path='/CreatePost' element={user ? <CreatePost /> : <Navigate to='/Login' />} />
            <Route path='/Profile' element={user ? <Profile /> : <Navigate to='/Login' />} />
            <Route path='/TodoList' element={<TodoList />} /> */}
            
          </Routes>{/* 
          <Footer/> */}
        </BrowserRouter>{/* 
    </AuthProvider> */}
    </div>
  );
}

export default App;

