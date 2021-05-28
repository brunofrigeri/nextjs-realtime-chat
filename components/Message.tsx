import React from 'react'
import { User } from '../lib/auth'
import { formatHour } from '../util/format'

interface MessageProps {
  message: string
  sentByYou: boolean
  chatWith: User | null
  createdAt: string
}

export default function Message({
  message,
  sentByYou,
  chatWith,
  createdAt,
}: MessageProps) {
  return (
    chatWith && (
      <div
        className={`flex ${sentByYou ? 'justify-end' : 'justify-start'} m-4`}
      >
        <p
          className={`${
            sentByYou ? 'bg-gray-light' : 'bg-white'
          } flex flex-col rounded-lg text-sm p-4`}
        >
          <div className="flex flex-row justify-between items-center mb-2">
            <p className="font-bold mr-8">
              {sentByYou ? 'You' : chatWith.name}
            </p>
            {createdAt && (
              <p className="text-gray-400 text-xs">{formatHour(createdAt)}</p>
            )}
          </div>
          {message && <p>{message}</p>}
        </p>
      </div>
    )
  )
}
