import Dashboard from '../../containers/Dashboard'
import withAuth from '../../hoc/withAuth'
import { useAuth } from '../../lib/auth'

function Auth() {
  const { auth, signOut } = useAuth()

  return (
    <Dashboard auth={auth} signOut={signOut}>
      <div>
        <h1>{auth?.name}</h1>
        <h2>{auth?.email}</h2>
      </div>
    </Dashboard>
  )
}

export default withAuth(Auth)
