import React, { useState } from 'react'
import styles from './Home.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import PostDetails from '../../components/postDetails/PostDetails'

const Home = () => {
  const [query, setQuery] = useState("")
  const {documents: posts, loading} = useFetchDocuments("posts")

  const navigate = useNavigate()

  const handleSubmit = (e: any) => {
    e.preventDefault()

    if(query){
      return navigate(`/Search?q=${query}`)
    }
  }
  return (
    <div id='start' className={styles.container}>
      <div className={styles.title}>
        <p className={styles.welcome}>Welcome to </p>
        <span className={styles.titleMiniBlog}>
          <h2>Mini</h2>
          <h1>BLOG</h1>
          <p>This is a Mini Blog from Kintiz</p>
        </span>
      </div>
         <form onSubmit={handleSubmit} className={styles.headerSearch}>
          <h1>New Posts</h1>
          <div className={styles.search}>
            <label>
              <input type="text" placeholder='Search for tags' onChange={(e) => setQuery(e.target.value)}/>
            </label>
            <button>Search</button>
          </div>
        </form>
       
      <div className={styles.posts}>
          {!loading && <div className={styles.loading}><span className={styles.loader}></span></div>}
          {posts && posts.map((post)=> 
            <div className={styles.postsDetails}>
              <PostDetails key={post.id} post={post}/>
            </div>
          )}
          {posts && posts.length === 0 && (
            <div>
              <p>Posts are not found</p>
              <Link to='/CreatePost'>Create the first post</Link>  
            </div>
          )}
        </div>
        <div className={styles.footer}>
            <h2>END <i className="bi bi-emoji-smile-fill"></i></h2>
            <a href="#start"><button><i className="bi bi-arrow-up"></i></button></a>
        </div>
    </div>
  )
}

export default Home