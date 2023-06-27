import styles from './Profile.module.scss'

import { useAuthValue } from '../../context/AuthContext'
import useAuthentication from '../../hooks/useAuthentication'
import {useDeleteDocument} from '../../hooks/useDeleteDocument'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { User } from 'firebase/auth'
import { Link, useParams } from 'react-router-dom'
import PostDetails from '../../components/postDetails/PostDetails'

const Profile = () => {
  const {id} = useParams()
  const user: User | null | undefined  = useAuthValue()  
  const uid = user?.uid
  
  const {documents: posts, loading} = useFetchDocuments("posts", null, uid)
  const {deleteDocument} = useDeleteDocument("posts")

  const {logout} = useAuthentication()

  return (
    <div className={styles.continer}>
      <div className={styles.profile}>
        <div className={styles.profileDescription}>
          <div className={styles.profileDescriptions}>
            <h2>{user?.displayName}</h2>
            <h4>{user?.email}</h4>
          </div>
          <div className={styles.btn}>
            <button onClick={logout}>Sign Out</button>
          </div>
        </div>
        <div className={styles.profilePosts}>
          {posts && posts.map((post) => (
            <div key={post.id} className={styles.profilePostDesc}>
              <div className={styles.profilePostsDesc}>
                  <PostDetails key={post.id} post={post}/>
                <div className={styles.functions}>
                  <button className={styles.btnEd}>
                    <Link to={`/Post/Edit/${post.id}`} >Editar</Link>
                  </button>
                  <button className={styles.btnEx} onClick={() => deleteDocument(post.id)}>Excluir</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Profile