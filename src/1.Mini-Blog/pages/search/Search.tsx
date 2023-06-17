import styles from './Search.module.scss'
import { useQuery } from '../../hooks/useQuery' 
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import PostDetails from '../../components/postDetails/PostDetails'
import { Link } from 'react-router-dom'

const Search = () => {
  
    const query = useQuery()
    const search = query.get("q")

    const {documents: posts} = useFetchDocuments("posts", search)
  
  return (
    <div className={styles.container}>
        <div className={styles.content}>
            <div className={styles.header}>
                <h2>Search</h2>
                <Link to='/Portifolio/Home'> Return</Link>

            </div>
            {posts && posts.length === 0 && (
                <>
                    <p>Post not Found</p>
                    <Link to='/Portifolio/Home'> Return</Link>
                </>
            )}
            {posts && posts.map((post)=> <PostDetails key={post.id} post={post}/>)}
        </div>
    </div>
  )
}

export default Search