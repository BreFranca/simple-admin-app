import React from 'react'

const MessageSend = ({message, sender}) => {
  return (
    <div>
      {sender}
      {message}
    </div>
  )
}

export default MessageSend