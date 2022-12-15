import React, { useEffect, useState } from 'react'
import firebase from 'firebase/auth'
import { auth } from '../api/firebase'

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthContext = React.createContext<firebase.User | null>(null)

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<firebase.User | null>(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser)
    })

    return unsubscribe
  }, [])

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}

export default AuthProvider
