import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { DocumentData, collection, doc, getDoc, getDocs } from "firebase/firestore";

export const useFetchComment = (docCollection: string, id: any) => {
    interface Comment {
        id: string;
        data: {
          // Defina a estrutura dos dados do comentário aqui
          // Por exemplo:
          comment: string;
          posOrNeg: string;
        };
      }

  const [document, setDocument] = useState<Comment[]>([])
  const [err, setErr] = useState<Error | undefined>()
  const [loadingComment, setLoadingComment] = useState(Boolean)

  useEffect(() => {
    const loadComment = async () => {
        setLoadingComment(true);

      try {
        const parentDocumentRef = doc(collection(db, docCollection), id);
        const subCollectionRef = collection(parentDocumentRef, "comments");
        
        const subCollectionSnapshot = await getDocs(subCollectionRef);

        const commentDocuments: Comment[] = []
        subCollectionSnapshot.forEach((doc) => {
            commentDocuments.push({ id: doc.id, data: doc.data() } as Comment);
        });
        
        setDocument(commentDocuments)
      } catch (err) {
        let systemErrorMessage;
        if (typeof err === 'object' && err !== null && 'message' in err && typeof err.message === "string") {
            systemErrorMessage = (err.message)
        }

            setErr(new Error(systemErrorMessage))
            setLoadingComment(false)
        }

        setLoadingComment(false);
    };

    loadComment()
  }, [docCollection, id])    

  return { document, loadingComment, err }
}