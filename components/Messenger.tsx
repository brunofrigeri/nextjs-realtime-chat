import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useCallback, useState } from 'react'
import useDatabase from '../hooks/useDatabase'
import { User } from '../lib/auth'
import { Chat, getMessagesWith, postMessage } from '../lib/db'
import Avatar from './Avatar'
import Message from './Message'

interface MessengerProps {
  activeChat: User | null
  user: User
  setShouldShowDetails(val: boolean): void
}

export default function Messenger({
  activeChat,
  user,
  setShouldShowDetails,
}: MessengerProps) {
  const [value, setValue] = useState('')

  const getMessengerById = useCallback(
    () => getMessagesWith(user.uid, activeChat?.uid),
    [activeChat]
  )

  const { data: messages } = useDatabase({
    asyncFunction: getMessengerById,
  })

  const onSubmitMessagePress = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (user.uid) {
      const data: Chat = {
        data: {
          name: activeChat?.name || null,
          uid: activeChat?.uid,
          email: activeChat?.email,
        },
        lastMessage: {
          createdAt: '05/06/2021',
          message: value,
          from: user.uid,
        },
      }

      Promise.all([
        postMessage(user.uid, data),
        postMessage(activeChat?.uid, {
          data: { ...user },
          lastMessage: data.lastMessage,
        }),
      ])
    }
  }

  return (
    <div className="h-full w-2/3 bg-gray-lighter py-4">
      <div className="sticky overflow-hidden top-0 bg-gray-lighter flex flex-row px-6 p-2">
        <button
          onClick={() => setShouldShowDetails(true)}
          className="flex flex-row items-center"
        >
          <Avatar name={activeChat?.name} />
          <p className="font-bold text-sm ml-2">{activeChat?.name}</p>
        </button>
      </div>
      <div className="overflow-y-scroll h-full row-start-1 row-end-3">
        <div className="max-h-screen">
          <div className="h-5/6 flex flex-col-reverse pb-40">
            {messages &&
              messages.map((message, index) => (
                <Message
                  key={index}
                  sentByYou={user?.uid === message.from}
                  chatWith={activeChat}
                  {...message}
                />
              ))}
          </div>
        </div>
      </div>
      <form
        onSubmit={(e) => onSubmitMessagePress(e)}
        className="sticky bottom-10 bg-white flex flex-row justify-between items-center rounded-xl mx-4 px-8 py-6 border"
      >
        <input
          className="w-full bg-white text-sm text-gray-500"
          placeholder={'Write your message here'}
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
        />
        <button type="submit">
          <FontAwesomeIcon icon={faPaperPlane} color={'#0C55B4'} />
        </button>
      </form>
    </div>
  )
}
