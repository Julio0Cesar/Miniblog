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
                    <h1>Post not Found</h1>
                </>
            )}
            <div >
                {posts && posts.map((post)=> 
                    <div className={styles.contentPost}>
                        <PostDetails key={post.id} post={post}/>
                    </div>
                )}
            </div>
        </div>
    </div>
  )
}

export default Search