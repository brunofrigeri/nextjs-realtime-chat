import withAuth from '../../hoc/withAuth'
import { useAuth } from '../../lib/auth'

function Auth() {
  const { auth, signOut } = useAuth()

  return (
    <div>
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
