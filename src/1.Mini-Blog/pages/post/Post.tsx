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
          <>
            <h1>{post.title}</h1>
            <img src={post.image} alt={post.title} />
            <p>{post.body}</p>
            <h3>Post:</h3>
            <div>
              {post.tagsArray.map((tag: string) => (
                <p key={tag}>
                  <span>#</span>
                  {tag}
                </p>
              ))}
            </div>
          </>
        ): (
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