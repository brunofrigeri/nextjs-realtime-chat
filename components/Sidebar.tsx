import { useRouter } from 'next/router'
import { User } from '../lib/auth'
import Avatar from './Avatar'
import Status, { STATUS } from './Status'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSignOutAlt,
  faComments,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons'

type Option = {
  id: string
  route: string
  icon: IconDefinition
}
interface SidebarProps {
  auth: User | null
  signOut(): void
}

export default function Sidebar({ auth, signOut }: SidebarProps) {
  const router = useRouter()

  const options: Array<Option> = [
    {
      id: 'comments',
      route: '/auth',
      icon: faComments,
    },
  ]

  const Header = auth ? (
    <div className="flex flex-row items-center">
      <Avatar image={auth.photoURL} name={auth.name} scale={0.5}>
        <Status status={STATUS['ONLINE']} />
      </Avatar>
    </div>
  ) : null

  const Options =
    options.length > 0 ? (
      <div className="flex flex-col w-full">
        {options.map((option) => (
          <div
            key={option.id}
            className={`flex px-4 py-2 justify-center ${
              router.pathname.startsWith(option.route)
                ? 'border-r-4 rounded-t-sm border-blue'
                : ''
            }`}
          >
            <FontAwesomeIcon icon={option.icon} size={'1x'} color={'#0C55B4'} />
          </div>
        ))}
      </div>
    ) : null

  return (
    <div className="min-h-screen h-full flex flex-col justify-between py-4 border-r border-gray-50 w-20">
      <div className="flex flex-col items-center w-full">
        <div>{Header}</div>
        <div className="w-full py-6">{Options}</div>
      </div>
      <div className="py-6 flex flex-col items-center">
        <button className="py-6 flex flex-col items-center" onClick={signOut}>
          <FontAwesomeIcon icon={faSignOutAlt} size={'lg'} color={'black'} />
        </button>
      </div>
    </div>
  )
}
