import styles from './Post.module.scss'

import { useParams } from 'react-router-dom'
import { useFetchDocument } from '../../hooks/useFetchDocument'

import Comments from '../../components/comments/Comments'

const Post = () => {
  const {id} = useParams()
  const {document: post, loading} = useFetchDocument("posts", id)
  return (
    <div className={styles.container}>
      <div className={styles.containerPost}>
          {typeof post !== 'undefined' && typeof post.tagsArray !== "undefined" ?  (
          <div className={styles.post}>
            <h1>{post.title}</h1>
            <img src={post.image} alt={post.title} />
            <div className={styles.postDetails}>
              <h2>{post.body}</h2>
              <h4>By: {post.createdBy}</h4>
              <div className={styles.tag}>
                {post.tagsArray.map((tag: string) => (
                  <p key={tag}> <span>#</span> {tag} </p>))}
              </div>
            </div>
          </div>
        ) : (
          <>
          {loading && <h1>Loading...</h1>}
          </>
        )}
      </div>
        <Comments id={id}/>
    </div>
  )
}

export default Post