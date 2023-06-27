import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore";

export const useFetchDocuments = (docCollection: string, search?: string | null, uid?: string | undefined| null) => {
    const [documents, setDocuments] = useState<any[]>([]);
    const [err, setErr] = useState<Error | undefined >();
    const [loading, setLoading] = useState(Boolean)
  
    // deal with memory leak
    const [cancelled, setCancelled] = useState(false)
  
    useEffect(() => {
      async function loadData() {
        if (cancelled) {
          return;
        }
  
        setLoading(true);

      const collectionRef = await collection(db, docCollection)

      try {
        let q;

        if (search) {
          q = await query(
            collectionRef,
            where("tagsArray", "array-contains", search),
            orderBy("createdAt", "desc")
          );
        } else if (uid) {
          q = await query(
            collectionRef,
            where("uid", "==", uid),
            orderBy("createdAt", "desc")
          );
        } else {
          q = await query(collectionRef, orderBy("createdAt", "desc"))
        }

        await onSnapshot(q, (querySnapshot) => {
          setDocuments(
            querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          );
        });
      } catch (err) {
      let systemErrorMessage;
        if (typeof err === 'object' && err !== null && 'message' in err && typeof err.message === "string") {
            systemErrorMessage = (err.message)
        }

            setErr(new Error(systemErrorMessage))
            setLoading(false)
        }
      }

        loadData();
    },[docCollection, search, uid, cancelled])


  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { documents, loading, err }
}