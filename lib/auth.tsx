import { createContext, useContext, useEffect, useState } from 'react'
import { createUserInRealtimeDatabase, putProfilePhoto } from './db'
import firebase from './firebase'

export type UserAuthentication = {
  name?: string
  email: string
  password: string
  photoURL?: File | string
}

export type User = {
  uid?: string
  name: string | null
  email?: string | null
  photoURL?: string | null
  token?: string | null
}

export interface AuthContext {
  auth: User | null
  loading: boolean
  error: string | null
  signInWithEmailAndPassword: (email: string, password: string) => {}
  createUserWithEmailAndPassword: (user: UserAuthentication) => void
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
  error: null,
  signInWithEmailAndPassword: async () => {},
  createUserWithEmailAndPassword: async () => {},
  signOut: async () => {},
  updateUser: async () => {},
})

function useProvideAuth() {
  const [auth, setAuth] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const authStateChanged = async (authState: firebase.User) => {
    if (authState) {
      const formattedAuthState = formatAuth(authState)
      const token = await authState.getIdToken()
      formattedAuthState.token = token

      setAuth(formattedAuthState)
      setLoading(false)
      setError(null)
    } else {
      setAuth(null)
      setLoading(false)
      setError(null)
    }
  }

  const updateUser = async (data: {
    name: string
    photoURL: string | null
  }) => {
    return firebase
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
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }

  const createUserWithEmailAndPassword = (user: UserAuthentication) => {
    setLoading(true)
    firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((res) => {
        if (res.user)
          putProfilePhoto(res.user.uid).then((response) =>
            response?.ref.getDownloadURL().then((img) => {
              if (res.user && res.user.uid) {
                createUserInRealtimeDatabase(res.user.uid, {
                  photoURL: img,
                  ...user,
                })
              }
            })
          )
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }

  const clear = () => {
    setAuth(null)
    setLoading(true)
    setError(null)
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
    error,
    signOut,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateUser,
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useProvideAuth()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => useContext(authContext)
