import React from 'react'

import MessageListUser from './MessageListUser'

const MessageList = ({listChat, sender, socket}) => {
  return (
    <div>
        {
          listChat
            .map((chat, index) => <MessageListUser key={index} user={chat.subject} id={chat._id} groupId={chat.groupId} sender={sender} socket={socket}/>)
        }
    </div>
  )
}

export default MessageList