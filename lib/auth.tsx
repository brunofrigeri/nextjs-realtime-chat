import { createContext, useContext, useEffect, useState } from 'react'
import firebase from './firebase'

type User = {
  uid: string
  name: string | null
  email: string | null
  photoURL: string | null
  token: string | null
}

export interface AuthContext {
  auth: User | null
  loading: boolean
  signInWithEmailAndPassword: (email: string, password: string) => {}
  signOut: () => {}
}

const formatAuth = (user: firebase.User): User => ({
  uid: user.uid,
  name: user.displayName,
  email: user.email,
  photoURL: user.photoURL,
  token: null,
})

const authContext = createContext<AuthContext>({
  auth: null,
  loading: false,
  signInWithEmailAndPassword: async (email, password) => {},
  signOut: async () => {},
})

function useProvideAuth() {
  const [auth, setAuth] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const authStateChanged = async (authState: firebase.User) => {
    if (authState) {
      const formattedAuthState = formatAuth(authState)

      formattedAuthState.token = await authState.getIdToken()

      setAuth(formattedAuthState)
      setLoading(false)
    } else {
      setAuth(null)
      setLoading(false)
    }
  }

  const signedIn = async (res: firebase.auth.UserCredential) => {
    if (res.user) {
      const user = formatAuth(res.user)
    }
  }

  const signInWithEmailAndPassword = async (
    email: string,
    password: string
  ) => {
    setLoading(true)
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(signedIn)
  }

  const clear = () => {
    setAuth(null)
    setLoading(true)
  }

  const signOut = () => {
    console.log('oi')
    return firebase.auth().signOut().then(clear)
  }

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(authStateChanged)

    return () => unsubscribe()
  }, [])

  return {
    auth,
    loading,
    signOut,
    signInWithEmailAndPassword,
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useProvideAuth()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => useContext(authContext)
