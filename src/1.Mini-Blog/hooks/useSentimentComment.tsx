import { useState, useEffect } from "react";

import Sentiment from 'sentiment'

export const useSentimentComment = (comment:  string) =>{
    const [posOrNeg, setPosOrNeg] = useState("")
    const [err, setErr] = useState<Error | undefined>()
    const [loading, setLoading] = useState(Boolean)
  

    useEffect(()=>{
        const loadSentimentComment = async () => {

            setLoading(true);

            try {
                const analyzer = await new Sentiment()
                const result = await analyzer.analyze(comment)
                if(result.score > 0){
                    setPosOrNeg("Mensagem Positiva")
                } 
                else if(result.score < 0){
                    setPosOrNeg("Mensagem Negativa")
                } 
                else{
                    setPosOrNeg("Mensagem Neutra")
                }
            } catch (err) {
                
                let systemErrorMessage;
                if (typeof err === 'object' && err !== null && 'message' in err && typeof err.message === "string") {
                    systemErrorMessage = (err.message)
                }

                setErr(new Error(systemErrorMessage))
                setLoading(false)
            }
            setLoading(false);
            
        }
        loadSentimentComment()
    }, [comment])

    return { posOrNeg, loading, err }
}