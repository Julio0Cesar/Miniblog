import styles from './Profile.module.scss'
import useAuthentication from '../../hooks/useAuthentication'
import { useAuthValue } from '../../context/AuthContext'
import { User } from 'firebase/auth'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { Link } from 'react-router-dom'
import {useDeleteDocument} from '../../hooks/useDeleteDocument'

const Profile = () => {
  const user: User | null | undefined  = useAuthValue()  
  const uid = user?.uid
  
  const {documents: posts, loading} = useFetchDocuments("posts", null, uid)
  const {deleteDocument} = useDeleteDocument("posts")

  const {logout} = useAuthentication()

  return (
    <div>
      {posts && posts.length !== 0 ? (
        <p></p>
      ) : (
        <p>Sem post</p>
      )}
      <div className={styles.dashboard}>

        {posts &&
          posts.map((post) => (
            <div key={post.id}>
              <p>{post.title}</p>
              <div>
                <Link to={`/Portifolio/Post/${post.id}`} >Ver</Link>
                <Link to={`/Portifolio/Post/Edit/${post.id}`} >Editar</Link>
                <button onClick={() => deleteDocument(post.id)}>Excluir</button>
              </div>
            </div>
          ))}

        <button onClick={logout}>Sign Out</button>
      </div>
    </div>
  )
}

export default Profile