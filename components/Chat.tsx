import React, { useState } from 'react'
import { User } from '../lib/auth'
import { UserRT } from '../lib/db'
import ChatSidebar from './ChatSidebar'
// import ChatSide from './ChatSide'
// import Details from './Details'
import Messenger from './Messenger'

export type Message = {
  createdAt: string
  from: string
  message: string
}

interface ChatProps {
  chats: Array<UserRT>
  user: User
}

export default function Chat({ chats, user }: ChatProps) {
  const [activeChat, setActiveChat] = useState<User | null>(null)
  const [, setShouldShowDetails] = useState<boolean>(false)

  return (
    <div className="flex flex-row w-full max-h-screen border-r border-gray-50 overflow-hidden">
      {/* ChatSidebar with different conversations */}
      <ChatSidebar
        chats={chats}
        activeChat={activeChat}
        setActiveChat={setActiveChat}
      />

      {/* Messenger with someone */}
      {activeChat && user.uid && (
        <Messenger
          activeChat={activeChat}
          user={user}
          setShouldShowDetails={setShouldShowDetails}
        />
      )}

      {/* Details about someone or some group */}
      {/* {shouldShowDetails && <Details setShouldShowDetails={setShouldShowDetails} />} */}
    </div>
  )
}
