import Link from 'next/link'
import { FormEvent, useState } from 'react'
import Button from '../components/Button'
import Auth from '../containers/Auth'
import withAuth from '../hoc/withAuth'
import { useAuth } from '../lib/auth'

function Home() {
  const { signInWithEmailAndPassword, loading, error } = useAuth()

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const signInWithEmailNPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    signInWithEmailAndPassword(email, password)
  }

  return (
    <Auth title={'Login'} description={'Welcome, login with your account!'}>
      <form onSubmit={signInWithEmailNPassword} className="flex my-6 flex-col">
        <input
          className="my-3 p-2 rounded-lg bg-gray-100 focus:shadow-2xl focus:bg-white focus:ring-2"
          value={email}
          onChange={(e) => {
            setEmail(e.currentTarget.value)
          }}
          placeholder={'Email'}
        />
        <input
          className="my-3 p-2 rounded-lg bg-gray-100 focus:shadow-2xl focus:bg-white focus:ring-2"
          value={password}
          onChange={(e) => {
            setPassword(e.currentTarget.value)
          }}
          type={'password'}
          placeholder={'Password'}
        />
        {!!error && (
          <span className="self-center text-sm text-red-500">{error}</span>
        )}
        <Button loading={loading}>Sign In</Button>
      </form>
      <p className="self-center text-sm">
        Haven't an account yet?{' '}
        <Link href="/signup">
          <span className="cursor-pointer text-sm underline text-blue-500">
            Create here.
          </span>
        </Link>
      </p>
    </Auth>
  )
}

export default withAuth(Home)
