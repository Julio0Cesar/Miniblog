import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { doc, updateDoc } from "firebase/firestore";

const initialState = {
    loading: null,
    error: null 
}

const updateReducer = (state: any, action: any) => {
    switch (action.type) {
      case "LOADING":
        return { loading: true, error: null };
      case "UPDATE_DOC":
        return { loading: false, error: null };
      case "ERROR":
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  }

  export const useUpdateDcocument = (docCollection: string) => {
    const [response, dispatch] = useReducer(updateReducer, initialState);
  
    // deal with memory leak
    const [cancelled, setCancelled] = useState(false);
  
    const checkCancelBeforeDispatch = (action: any) => {
      if (!cancelled) {
        dispatch(action);
      }
    };
  
    const updateDocument = async (id: any, data: any) => {
      checkCancelBeforeDispatch({ type: "LOADING" });
  
      try {
        const updateDocument = await updateDoc(doc(db,docCollection, id), data)

        checkCancelBeforeDispatch({
          type: "UPDATE_DOC",
          payload: updateDocument,
        });
      } catch (error) {
        checkCancelBeforeDispatch({ type: "ERROR", payload: error });
      }
    };
  
    useEffect(() => {
      return () => setCancelled(true);
    }, []);
  
    return { updateDocument, response };
  };