import React from "react"

import { connect } from "react-redux"
import * as actions from "../../store/actions"
import { FontIcon } from "../../components/atoms/FontIcon";
import { GeneralChatIcon } from "../../_assets/icons/GeneralChatIcon";

class MessageListUser extends React.Component {

  renderIcon(category) {
    if (category === 'general') {
      return null
    } else if (category === 'subgroup') {
      return (
        <div className="ChatProfile">
          <FontIcon style={{display: 'inline', color: 'black', fontSize: 'initial', fontStyle: 'normal'}} name="users" />
        </div>
      )
    } else {
      return (
        <div className="ChatProfile">
          <FontIcon style={{display: 'inline', color: 'black', fontSize: 'initial', fontStyle: 'normal'}} name="user" />
        </div>
      )
    }
  }
  
  getUnreadCount(chats, currentChat, sender) {
    for (let chat of chats) {
      if (chat._id === currentChat._id) {
        if (currentChat && currentChat.chatDetail && currentChat.chatDetail[sender]) {
          return currentChat.chatDetail[sender].messagesUnread
        } else {
          return 0
        }
      }
    }
  }

  render() {
    let count = this.getUnreadCount(this.props.groupChats, this.props.chat, this.props.sender)
    return (
      <div
        className="MessageCategory MessageButton"
        onClick={() =>
          this.props.selectChat(
            this.props.userLogged._id,
            this.props.groupChats,
            this.props.chat._id,
            this.props.chat.groupId
          )
        }
      >
        {
          this.props.chat.category === 'general' ?
            <GeneralChatIcon />
            : null
        }
        {this.renderIcon(this.props.chat.category)}
        <div style={{width: '100%'}}>{this.props.chat.subject}</div>
        {
          count > 0 ?
            <div style={{width: '100%', textAlign: 'center', borderRadius: '50%', backgroundColor: '#3c8ff9', color: 'white'}}>{count}</div>
            : null
        }
      </div>
    )
  }
}

function mapStateToProps (state) {
  const { userLogged } = state.auth
  let { groupChats } = state.groups
  return {
    userLogged,
    groupChats
  }
}

export default connect(
  mapStateToProps,
  actions,
  null,
  {pure: false}
)(MessageListUser)
