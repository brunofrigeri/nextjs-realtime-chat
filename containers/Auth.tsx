import React from 'react'

interface AuthProps {
  title?: string
  description?: string
  children?: React.ReactNode | React.ReactNode[]
}

const Auth = ({ title, description, children }: AuthProps) => {
  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">
      <div className="flex flex-col w-96 p-10 rounded-xl justify-center self-center items-center bg-gray-50">
        {title && <h1 className="font-bold text-2xl pb-2">{title}</h1>}
        {description && <h2 className="text-center">{description}</h2>}
        <div className="flex flex-col w-full">{children}</div>
      </div>
    </div>
  )
}

export default Auth
