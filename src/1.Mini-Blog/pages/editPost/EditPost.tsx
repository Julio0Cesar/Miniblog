import styles from './EditPost.module.scss'

import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuthValue } from '../../context/AuthContext'
import {  useFetchDocument } from "../../hooks/useFetchDocument";
import { useUpdateDcocument } from '../../hooks/useUpdateDocument';
import { User } from 'firebase/auth'

const EditPost = () => {
  const {id} = useParams()
  const {document: post} = useFetchDocument("posts",  id)
  
  const [title, setTitle] = useState<undefined | string>('')
  const [image, setImage] = useState('')
  const [body, setBody] = useState<undefined | string>(undefined)
  const [tags, setTags] = useState<any>([])
  const [formErr, setFormErr] = useState<Error | undefined | null>()

  useEffect(()=>{
    if(post){
      setTitle(post.title)
      setBody(post.body)
      setImage(post.image)
      setTags(post.tags) 
    }
  }, [post])

  const user: User | null | undefined = useAuthValue()
  
  const {updateDocument, response} = useUpdateDcocument("posts")

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

    const data ={
      title,
      image,
      body,
      tagsArray,
      uid: user?.uid,
      createdBy: user?.displayName

    }

    updateDocument(id, data)
  
    navigate("/Portifolio/Profile") 
  }


  return (
    <div className={styles.container}>
      {post && (
        <>
          <form onSubmit={handleSubmit} className={styles.form}>
          <h1>Edit Post</h1>
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
              <span>Preview of image</span>
              <img
                src={post.image}
                alt={post.title}
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
        </>
      )}
    </div>
  )
}

export default EditPost