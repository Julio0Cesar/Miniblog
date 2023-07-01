import styles from './Comments.module.scss'

import { useInsertComment } from '../../hooks/useInsertComment'
import { useFetchComment } from '../../hooks/useFetchComment'
import { useSentimentComment } from '../../hooks/useSentimentComment'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

type Props = {
    id: any
}

const Comments = ({id}: Props) => {
    const [comment, setComment] = useState("")

    const {posOrNeg} = useSentimentComment(comment)
    const {insertComment, responseComment} = useInsertComment("posts")
    const {document: commentDocuments} = useFetchComment("posts", id)

    const handleSubmit = async (e: any) => {
      e.preventDefault()

      if (posOrNeg !== '' && comment !== '') {
        await insertComment({posOrNeg, comment}, id);
      }
      setComment("")
      window.location.reload()
    }
  
  return (
    <div className={styles.comments}>
      <div className={styles.commentsArea}>
        <h3>Add new Comment</h3>
          <form className={styles.form} onSubmit={handleSubmit}>
            <label>
              <input
                autoComplete='off'
                type='text'
                name='comment'
                placeholder='Send a new Comment' 
                required
                onChange={(e) =>setComment(e.target.value)} 
                value={comment}
              />
            </label>
                {responseComment.loading && <button>Wait...</button>}
                {!responseComment.loading && <button className={styles.btn}>Comment</button>}
          </form>
            {commentDocuments.length > 0 ? ( commentDocuments.map((commentDocument) => (
              <div key={commentDocument.id} className={styles.comment}>
                <p className={styles.commentArea}>{commentDocument.data.comment}</p>
                {commentDocument.data.posOrNeg === "Mensagem Positiva" && (<p className={styles.sentimentAreaP}><i className="bi bi-arrow-up"></i></p>)}
                {commentDocument.data.posOrNeg === "Mensagem Negativa" && (<p className={styles.sentimentAreaN}><i className="bi bi-arrow-down"></i></p>)}
                {commentDocument.data.posOrNeg === "Mensagem Neutra" && (<p className={styles.sentimentAreaNE}>-</p>)}
              </div>
            )) 
            ) :(
              <h4 className={styles.noComment}>No have Comments <i className="bi bi-emoji-dizzy"></i></h4>
            )}
      </div>
    </div>
  )
}

export default Comments