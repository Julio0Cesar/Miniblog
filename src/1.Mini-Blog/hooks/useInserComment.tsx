import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { collection, addDoc, Timestamp, doc } from "firebase/firestore";

const initialState = {
    loading: null,
    error: null 
}

const insertReducer = (state: any, action: any) => {
    switch (action.type) {
      case "LOADING":
        return { loading: true, error: null };
      case "INSERTED_DOC":
        return { loading: false, error: null };
      case "ERROR":
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  }

  export const useInsertComment= (docCollection: string) => {
    const [responseComment, dispatch] = useReducer(insertReducer, initialState);
  
    // deal with memory leak
    const [cancelled, setCancelled] = useState(false);
  
    const checkCancelBeforeDispatch = (action: any) => {
      if (!cancelled) {
        dispatch(action);
      }
    };
  
    const insertComment = async (document: any, parentId: any) => {
      checkCancelBeforeDispatch({ type: "LOADING" });
  
      try {
        const newDocument = { ...document, createdAt: Timestamp.now() };

        const parentDocumentRef = doc(collection(db, docCollection), parentId);
        const subCollectionRef = collection(parentDocumentRef, "comments");
        
        const insertedDocument = await addDoc(subCollectionRef, newDocument);

        checkCancelBeforeDispatch({
          type: "INSERTED_DOC",
          payload: insertedDocument,
        });
      } catch (error) {
        checkCancelBeforeDispatch({ type: "ERROR", payload: error });
      }
    };
  
    useEffect(() => {
      return () => setCancelled(true);
    }, []);
  
    return { insertComment, responseComment };
  };