import styles from './Profile.module.scss'

import { useAuthValue } from '../../context/AuthContext'
import useAuthentication from '../../hooks/useAuthentication'
import {useDeleteDocument} from '../../hooks/useDeleteDocument'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { User } from 'firebase/auth'
import { Link, useParams } from 'react-router-dom'
import PostDetails from '../../components/postDetails/PostDetails'
import profilePic from '../../assets/PngItem_223968.png'

const Profile = () => {
  const {id} = useParams()
  const user: User | null | undefined  = useAuthValue()  
  const uid = user?.uid

  const {documents: posts, loading} = useFetchDocuments("posts", null, uid)
  const {deleteDocument} = useDeleteDocument("posts")

  const {logout} = useAuthentication()

  return (
      <div className={styles.container}>
        <div className={styles.headerProfile}>
          <div className={styles.profileDescription}>
            <img src={profilePic} alt=''/>
            <div className={styles.profileName}>
              <h2>{user?.displayName?.toUpperCase()}</h2>
              <h4>{user?.email}</h4>
            </div>
          </div>
          <div className={styles.btn}>
            <button onClick={logout}>Sign Out</button>
            <Link to={'./CreatePost'}><button onClick={logout}>New Post<i className="bi bi-plus-lg"></i></button></Link>
          </div>
        </div>
        <hr className={styles.hr}/>
        <div className={styles.profilePosts}>
          {posts && posts.map((post) => (
            <div className={styles.profilePost}>
              <PostDetails key={post.id} post={post}/>
              <div className={styles.btns}>
                <button className={styles.btnEd}>
                  <Link to={`/Post/Edit/${post.id}`} >Editar</Link>
                </button>
                <button className={styles.btnEx} onClick={() => deleteDocument(post.id)}>Excluir</button>

              </div>
            </div>
          ))}
        </div>
      </div>
  )
}

export default Profile