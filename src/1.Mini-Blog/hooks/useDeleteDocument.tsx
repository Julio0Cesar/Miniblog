import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { doc, deleteDoc } from "firebase/firestore";

const initialState = {
    loading: null,
    error: null 
}

const deleteReducer = (state: any, action: any) => {
    switch (action.type) {
      case "LOADING":
        return { loading: true, error: null }
      case "DELETED_DOC":
        return { loading: false, error: null }
      case "ERROR":
        return { loading: false, error: action.payload }
      default:
        return state;
    }
  }

  export const useDeleteDocument = (docCollection: string) => {
    const [response, dispatch] = useReducer(deleteReducer, initialState);
  
    // deal with memory leak
    const [cancelled, setCancelled] = useState(false);
  
    const checkCancelBeforeDispatch = (action: any) => {
      if (!cancelled) {
        dispatch(action);
      }
    };
  
    const deleteDocument = async (id: string) => {
      checkCancelBeforeDispatch({ type: "LOADING" })
  
      try {
        const deletedDocument = await deleteDoc(doc(db, docCollection, id))
        console.log(deleteDocument)
  
        checkCancelBeforeDispatch({
          type: "DELETED_DOC",
          payload: deletedDocument,
        })
      } catch (err) {
        if (err !== null && typeof err=== "string") {
          checkCancelBeforeDispatch({ type: "ERROR", payload: err })
          console.log(err)
        }
      }
    };
  
    useEffect(() => {
      return () => setCancelled(true);
    }, []);
  
    return { deleteDocument, response };
  };