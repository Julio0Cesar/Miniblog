import styles from '../src/styles/Global.scss'

import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom'; 
import { onAuthStateChanged, User} from 'firebase/auth';
import { useState, useEffect } from 'react';
import { AuthProvider } from './1.Mini-Blog/context/AuthContext';

import First from './pages/home/First'
import NavBar from './components/navbar/NavBar'
import Footer from './components/footer/Footer';
import Home from './1.Mini-Blog/pages/home/Home';
import Nav from './1.Mini-Blog/components/navbar/Nav';
import About from './1.Mini-Blog/pages/about/About';
import Login from './1.Mini-Blog/pages/login/Login';
import CreateAccount from './1.Mini-Blog/pages/createAccount/CreateAccount';
import CreatePost from './1.Mini-Blog/pages/createPost/CreatePost';
import Profile from './1.Mini-Blog/pages/profile/Profile';
import E404 from './1.Mini-Blog/pages/404/E404';
import Post from './1.Mini-Blog/pages/post/Post';
import Search from './1.Mini-Blog/pages/search/Search';
import useAuthentication from './1.Mini-Blog/hooks/useAuthentication';
import TodoList from './2.Todo-List/Todo-List';
import EditPost from './1.Mini-Blog/pages/editPost/EditPost';



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
            <Route path='/Portifolio/' element={<First />} />
            
            <Route path='/Portifolio/Home' element={<Home />} />
            <Route path='/Portifolio/About' element={<About />} />
            <Route path='/Portifolio/Search' element={<Search />} /> 
            <Route path='/Portifolio/Post/:id' element={<Post />} />
            <Route path='/Portifolio/Login' element={!user ? <Login /> : <Navigate to='/Portifolio/Home' />} />
            <Route path='/Portifolio/CreateAccount' element={!user ? <CreateAccount /> : <Navigate to='/Portifolio/Home' />} />
            <Route path='/Portifolio/CreatePost' element={user ? <CreatePost /> : <Navigate to='/Portifolio/Login' />} />
            <Route path='/Portifolio/Profile' element={user ? <Profile /> : <Navigate to='/Portifolio/Login' />} />
            <Route path='/Portifolio/Post/Edit/:id' element={user ? <EditPost /> : <Navigate to='/Portifolio/Login' />} />
            
            <Route path='/Portifolio/TodoList' element={<TodoList />} /> 
          </Routes>
          <Footer/>
        </BrowserRouter>
    </AuthProvider>
    </div>
  );
}

export default App;

