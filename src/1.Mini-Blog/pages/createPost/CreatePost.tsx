import styles from './CreatePost.module.scss'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthValue } from '../../context/AuthContext'
import { useInsertDocument } from '../../hooks/useInsertDocument'
import { User } from 'firebase/auth'

const CreatePost = () => {
  
  const [title, setTitle] = useState<undefined | string>('')
  const [image, setImage] = useState('')
  const [body, setBody] = useState<undefined | string>(undefined)
  const [tags, setTags] = useState<any>([])
  const [formErr, setFormErr] = useState<Error | undefined | null>()

  const user: User | null | undefined = useAuthValue()
  
  const {insertDocument, response} = useInsertDocument("posts")

  const navigate = useNavigate()

  const handleSubmit = (e: any) =>{
    e.preventDefault()
    setFormErr(null)
  
    //validate image url
    try {
      new URL(image)
    } catch (err) {
      let systemErrorMessage;
      if (typeof err === 'object' && err !== null && 'message' in err && typeof err.message === "string") {
        if(err){
          systemErrorMessage = "The image need be a URL"
          setFormErr(new Error(systemErrorMessage))
          return 
        }
      }
    }

    //check values
      let systemErrorMessage;
      if (typeof formErr === 'object' && formErr !== null && 'message' in formErr && typeof formErr.message === "string") {
        if(title === '' || image === '' || tags === undefined || body === undefined){
          systemErrorMessage = "Please, verify all inputs"
          setFormErr(new Error(systemErrorMessage))
          return
        }
      }

    //create array of tags
    const tagsArray = tags.join(',').split(',').map((tag: string)=> tag.trim().toLowerCase())


    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user?.uid,
      createdBy: user?.displayName
    })
  
    navigate("/Portifolio/Home") 
  }


  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
      <h1>Create Post</h1>
        <label>
          <span>Title: </span>
          <input 
            type="text" 
            name='title' 
            placeholder='Title' 
            autoComplete='off'
            required
            onChange={(e) =>setTitle(e.target.value)} 
            value={title}
          />
        </label>

        <label>
          <span>URL Image: </span>
          <input 
            type="text" 
            name='image' 
            placeholder='Image' 
            autoComplete='off'
            required
            onChange={(e) =>setImage(e.target.value)} 
            value={image}
          />
        </label>

        <label>
          <span>Content: </span>
          <input 
            type="text" 
            name='body' 
            placeholder='Content' 
            autoComplete='off'
            required
            onChange={(e) =>setBody(e.target.value)} 
            value={body}
          />
        </label>

        <label>
          <span>Tags: </span>
          <input 
            type="text" 
            name='tags' 
            placeholder='Tags' 
            autoComplete='off'
            required
            onChange={(e) =>setTags([e.target.value])} 
            value={tags}
          />
        </label>
         {response.loading && <button>Wait...</button>}
        {!response.loading && <button>Post</button>}
        {formErr instanceof Error && <p className={styles.err}>{formErr.message}</p>}
       
      </form>
    </div>
  )
}

export default CreatePost