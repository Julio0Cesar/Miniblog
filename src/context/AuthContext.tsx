import { User } from 'firebase/auth'
import {useContext, createContext, ReactNode} from 'react'

const AuthContext = createContext<User | null | undefined>(undefined)

type Props ={
    value: User | null | undefined,
    children: ReactNode
}

export function AuthProvider({ children, value }: Props){
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuthValue(){
    return useContext(AuthContext)
}