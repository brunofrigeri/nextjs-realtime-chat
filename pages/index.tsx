import Head from 'next/head'
import { FormEvent, useState } from 'react'
import { useAuth } from '../lib/auth'
import firebase from '../lib/firebase'

export default function Home() {
  const { auth, signOut, signInWithEmailAndPassword, updateUser } = useAuth()

  const [name, setName] = useState<string>('')
  const [photoURL] = useState<string | null>(null)

  const onChangeProfilePress = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    updateUser({ name, photoURL })
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome <p className="text-green-600">{auth?.name}</p> to{' '}
          <a className="text-blue-600" href="https://nextjs.org">
            {auth ? 'Dashboard!' : 'Authentication Page!'}
          </a>
        </h1>

        <form className="flex flex-col" onSubmit={onChangeProfilePress}>
          <input
            className="border rounded p-2 my-4"
            placeholder={'Type your name'}
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
          />
          <button className="bg-blue-500 p-2 text-white rounded" type="submit">
            Submit your changes
          </button>
        </form>

        {!auth ? (
          <a
            onClick={() => signInWithEmailAndPassword('b@gmail.com', '123456')}
          >
            Sign in
          </a>
        ) : (
          <a onClick={signOut}>Sign out</a>
        )}
      </main>
    </div>
  )
}
