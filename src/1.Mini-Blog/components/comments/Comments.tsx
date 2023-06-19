import styles from './Comments.module.scss'

import { useParams } from 'react-router-dom'
import { useInsertComment } from '../../hooks/useInserComment'
import { useFetchComment } from '../../hooks/useFetchComment'
import { useEffect, useState } from 'react'

import Sentiment from 'sentiment'

type Props = {
    id: any
}

const Comments = ({id}: Props) => {
    const {document: comments, loadingComment} = useFetchComment("posts", id)

    const {insertComment, responseComment} = useInsertComment("posts")
  
    const [displayComment, setDisplayComment] = useState("")
    const [posOrNeg, setPosOrNeg] = useState("")
  
    const analyzeSentiment = (displayComment:  string) =>{
      const analyzer = new Sentiment()
      const result = analyzer.analyze(displayComment)
  
        if(result.score > 0){
          setPosOrNeg("Mensagem Positiva")
        } 
        else if(result.score < 0){
          setPosOrNeg("Mensagem Negativa")
        } 
        else{
          setPosOrNeg("Mensagem Neutra")
        }
    }

    const handleSubmit = async (e: any) => {
      e.preventDefault()
      analyzeSentiment(displayComment)
  
      if (posOrNeg !== '' && displayComment !== '') {
        insertComment({posOrNeg, displayComment}, id);
      }
    }
  
  return (
    <div className={styles.form}>
        {comments.length > 0 ? (
    comments.map((commentario) => (
      <div key={commentario.id}>
        <p>{commentario.data.comment}</p>
        <p>{commentario.data.posOrNeg}</p>
      </div>
    ))
  ) : (
    <p>Nenhum comentário encontrado.</p>
  )}
        <form onSubmit={handleSubmit}>
          <label>
              <input
              type='text'
              name='comment'
              placeholder='Comment' 
              required
              onChange={(e) =>setDisplayComment(e.target.value)} 
              value={displayComment}
              />
              {responseComment.loading && <button>Wait...</button>}
              {!responseComment.loading && <button>Post</button>}
          </label>
      </form>
      </div>
  )
}

export default Comments