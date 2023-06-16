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
      return navigate(`/Portifolio/Search?q=${query}`)
    }
  }
  return (
    <div className={styles.container}>
         <form onSubmit={handleSubmit} className={styles.headerSearch}>
          <h1>New Posts</h1>
          <div className={styles.search}>
            <input type="text" placeholder='Search for tags' onChange={(e) => setQuery(e.target.value)}/>
            <button>Search</button>
          </div>
        </form>
       
      <div>
          {!loading && <div className={styles.loading}><span className={styles.loader}></span></div>}
           {posts && posts.map((post)=> <PostDetails key={post.id} post={post}/>)}
          {posts && posts.length === 0 && (
            <div>
              <p>Posts are not found</p>
              <Link to='/Portifolio/CreatePost'>Create the first post</Link>  
            </div>
          )}
        </div>
    </div>
  )
}

export default Home