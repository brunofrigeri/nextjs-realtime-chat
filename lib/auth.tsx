import { createContext, useContext, useEffect, useState } from 'react'
import firebase from './firebase'

type User = {
  uid?: string
  name: string | null
  email?: string | null
  photoURL: string | null
  token?: string | null
}

export interface AuthContext {
  auth: User | null
  loading: boolean
  signInWithEmailAndPassword: (email: string, password: string) => {}
  signOut: () => {}
  updateUser: (data: { name: string; photoURL: string | null }) => {}
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
  updateUser: async (data) => {},
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

  const updateUser = async (data: {
    name: string
    photoURL: string | null
  }) => {
    await firebase
      .auth()
      .currentUser?.updateProfile({
        displayName: data.name,
        photoURL: data.photoURL,
      })
      .then(() => {
        setAuth({ ...auth, name: data.name, photoURL: data.photoURL })
      })
  }

  const signInWithEmailAndPassword = async (
    email: string,
    password: string
  ) => {
    setLoading(true)
    return firebase.auth().signInWithEmailAndPassword(email, password)
  }

  const clear = () => {
    setAuth(null)
    setLoading(true)
  }

  const signOut = () => {
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
    updateUser,
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useProvideAuth()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => useContext(authContext)
