import { useEffect, useState } from 'react'
import AvatarInput from '../../components/AvatarInput'
import withAuth from '../../hoc/withAuth'
import { useAuth } from '../../lib/auth'

function Auth() {
  const { auth, signOut } = useAuth()

  const [photoURL, setPhotoURL] = useState<File | string | undefined>(undefined)

  useEffect(() => {
    if (auth && auth.photoURL) setPhotoURL(auth.photoURL)
  }, [auth])

  return (
    <div>
      <div className="h-24">
        <AvatarInput value={photoURL} setValue={setPhotoURL} />
      </div>
      <h1>{auth?.name}</h1>
      <h2>{auth?.email}</h2>
      <button
        onClick={(e) => {
          e.preventDefault()
          signOut()
        }}
      >
        Sign Out
      </button>
    </div>
  )
}

export default withAuth(Auth)
