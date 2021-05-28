import Chat from '../../components/Chat'
import Dashboard from '../../containers/Dashboard'
import withAuth from '../../hoc/withAuth'
import useDatabase from '../../hooks/useDatabase'
import { useAuth } from '../../lib/auth'
import { getUsers, UserRT } from '../../lib/db'

function Auth() {
  const { auth, signOut } = useAuth()

  const { data } = useDatabase<Array<UserRT>>({
    asyncFunction: () => getUsers(auth?.uid),
  })

  return (
    auth?.uid && (
      <Dashboard auth={auth} signOut={signOut}>
        {data && <Chat chats={data} user={auth} />}
      </Dashboard>
    )
  )
}

export default withAuth(Auth)
