import styles from './PostDetails.module.scss'
import { Link } from 'react-router-dom'

type Props = {
    post: any
}

const PostDetails = ({post}: Props) => {
  return (
    <div className={styles.container}>
        <div className={styles.imageArea}>
            <div className={styles.image}>
                <img src={post.image} alt={post.title}/>
                <Link to={`/Post/${post.id}`}>View</Link>
                <div className={styles.tags}>
                    {post.tagsArray.map((tag: string) => (
                        <p key={tag}> 
                            <span>#</span>{tag}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default PostDetails