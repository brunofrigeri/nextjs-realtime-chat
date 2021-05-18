import Sidebar from '../components/Sidebar'
import { User } from '../lib/auth'

interface DashboardProps {
  auth: User | null
  children: React.ReactNode
  signOut(): void
}

export default function Dashboard({ children, auth, signOut }: DashboardProps) {
  return auth ? (
    <div className="flex flex-row">
      <Sidebar auth={auth} signOut={signOut} />
      <div className="px-8">{children}</div>
    </div>
  ) : null
}
