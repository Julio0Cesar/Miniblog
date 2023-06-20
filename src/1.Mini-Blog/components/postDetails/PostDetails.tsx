import styles from './PostDetails.module.scss'
import { Link } from 'react-router-dom'

type Props = {
    post: any
}

const PostDetails = ({post}: Props) => {
  return (
    <div className={styles.container}>
        <div className={styles.imageText}>
            <div className={styles.image}>
                <img src={post.image} alt={post.title}/>
            </div>
            <div className={styles.text}>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
                <p>By: {post.createdBy}</p>
            </div>
        </div>
        <div className={styles.tags}>
            {post.tagsArray.map((tag: string) => (
                <p key={tag}> 
                    <span>#</span>{tag}
                </p>
            ))}
        </div>
        <div className={styles.link}>

        <Link to={`/Portifolio/Post/${post.id}`}>View</Link>
        </div>
    </div>
  )
}

export default PostDetails