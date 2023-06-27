import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { DocumentData, doc, getDoc } from "firebase/firestore";

export const useFetchDocument = (docCollection: string, id: any) => {
  const [document, setDocument] = useState<DocumentData >()
  const [err, setErr] = useState<Error | undefined>()
  const [loading, setLoading] = useState(Boolean)

  useEffect(() => {
    const loadDocument = async () => {
      setLoading(true);

      try {
        const docRef = await doc(db, docCollection, id)
        const docSnap = await getDoc(docRef)

        setDocument(docSnap.data())

      } catch (err) {
        let systemErrorMessage;
        if (typeof err === 'object' && err !== null && 'message' in err && typeof err.message === "string") {
            systemErrorMessage = (err.message)
        }

            setErr(new Error(systemErrorMessage))
            setLoading(false)
        }

      setLoading(false);
    };

    loadDocument()
  }, [docCollection, id])    

  return { document, loading, err }
}