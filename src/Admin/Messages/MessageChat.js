import React from 'react'
import Moment from 'moment'
import { connect } from "react-redux"

import * as actions from "../../store/actions"

class MessageChat extends React.Component {

  memberName(members, sender) {
    for (let member of members) {
      if (member._id.toString() === sender) {
        return member.name
      }
    }
  }
  
  memberColor(senderId) {
    const last3digits = senderId.slice(-3)
    const encoded = new Buffer(last3digits).toString('hex')
    return `#${encoded}`
  }

  render() {
    let currentChat = null
    for (let chat of this.props.groupChats) {
      if (this.props.selectedChat !== null && chat._id === this.props.selectedChat.chatId) {
        currentChat = chat
        break
      }
    }
    return (
      <>
        {
          currentChat === null ? 
            this.props.groupChats.length === 0 ?
            <p style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', textAlign: 'center'}}>
            Você ainda não tem nenhuma conversa =( <br/> Abra o app e comece uma nova!
          </p> :
          <p style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white'}}>
            Selecione uma conversa
          </p> :
            <div className='MessageChatTalkBox'>
              {currentChat.messages.map((msg, index) =>
              <div key={index} className={msg.sender === this.props.sender ? 'myself-box' : 'other-box' }>
                <span key={index} className={msg.sender === this.props.sender ? 'myself' : 'other'}>
                  {msg.sender === this.props.sender? null : <div style={{color: this.memberColor(msg.sender), fontWeight: 'bold', paddingBottom: '4px'}}>
                    {this.memberName(this.props.members, msg.sender)}
                  </div> }
                  {msg.content}
                  <em>{Moment(msg.dateSent).format('HH:mm:ss')}</em>
                </span>
              </div>)}
            </div>
        }
      </>
    )
  }
}

function mapStateToProps (state) {
  let { selectedChat, groupChats } = state.groups
  return {
    selectedChat,
    groupChats
  }
}

export default connect(mapStateToProps, actions, null, { pure: false })(MessageChat)

// export default connect(
//   mapStateToProps,
//   actions
// )(MessageChat)