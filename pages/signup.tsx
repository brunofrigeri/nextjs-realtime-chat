import { FormEvent, useState } from 'react'
import Auth from '../containers/Auth'
import withAuth from '../hoc/withAuth'
import { useAuth } from '../lib/auth'
import Link from 'next/link'
import Button from '../components/Button'
import AvatarInput from '../components/AvatarInput'

function SignUp() {
  const { createUserWithEmailAndPassword, error, loading } = useAuth()

  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [photoURL, setPhotoURL] = useState<File | undefined>(undefined)

  const createUserWithEmailNPassword = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    createUserWithEmailAndPassword({
      name,
      email,
      password,
      photoURL,
    })
  }

  return (
    <Auth
      title={'Create an Account'}
      description={
        'Welcome, if you want to be part of our application, sign up!'
      }
    >
      <div className="h-24">
        <AvatarInput value={photoURL} setValue={setPhotoURL} />
      </div>
      <form
        onSubmit={createUserWithEmailNPassword}
        className="flex my-6 flex-col"
      >
        <input
          className="my-3 p-2 rounded-lg bg-gray-100 focus:shadow-2xl focus:bg-white focus:ring-2"
          value={name}
          onChange={(e) => {
            setName(e.currentTarget.value)
          }}
          placeholder={'Name'}
        />
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
        <Button loading={loading}>Sign Up</Button>
      </form>
      <p className="self-center text-sm">
        Already have an account?{' '}
        <Link href="/">
          <span className="cursor-pointer text-sm underline text-blue-500">
            Click here.
          </span>
        </Link>
      </p>
    </Auth>
  )
}

export default withAuth(SignUp)
