import React from 'react'
import { User } from '../lib/auth'
import { UserRT } from '../lib/db'
import Avatar from './Avatar'

interface ConversationsProps {
  chats?: Array<UserRT>
  activeChat: User | null
  setActiveChat(user: User): void
}

export default function Conversations({
  chats,
  activeChat,
  setActiveChat,
}: ConversationsProps) {
  return (
    <div className="overflow-auto pb-20 h-full">
      {chats &&
        chats.length > 0 &&
        chats.map(({ uid, name, email, chat }) => (
          <button
            onClick={() =>
              uid && setActiveChat({ uid, name: name || email || null })
            }
            className={`flex flex-row ${
              activeChat && activeChat.uid === uid
                ? 'bg-blue-100'
                : 'bg-gray-lighter'
            } my-4 rounded-lg w-full p-6`}
            key={uid}
          >
            <div>
              <Avatar name={name || email} scale={0.5} />
            </div>
            <div className="flex flex-col ml-2 w-full">
              <div className="flex flex-row justify-between">
                <p className="font-semibold text-base">{name || email}</p>
                {chat && chat.lastMessage.createdAt && (
                  <p className="text-xs text-gray-500">
                    {chat.lastMessage.createdAt}
                  </p>
                )}
              </div>
              {chat && chat.lastMessage.message && (
                <p className="text-xs text-gray-500 text-left	">
                  {chat.lastMessage.message}
                </p>
              )}
            </div>
          </button>
        ))}
    </div>
  )
}
