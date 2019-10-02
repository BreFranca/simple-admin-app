import React, { Component } from 'react'
import MessageListUser from './MessageListUser'
import { FontIcon } from '../../components/atoms/FontIcon';
import { SubgroupChatIcon } from '../../_assets/icons/SubgroupChatIcon';

export class MessageSubgroupList extends Component {

  constructor() {
    super()
    this.state = {
      clicked: false
    }
  }

  onClick() {
    this.setState({clicked: !this.state.clicked})
  }

  renderDot() {
    let temp = false
    for (let chat of this.props.chats) {
      if (chat.chatDetail && chat.chatDetail[this.props.sender].messagesUnread > 0) {
        temp = true
        break
      }
    }
    return temp
  }

  render() {
    return (
      <div>
        <div className="MessageCategory" onClick={this.onClick.bind(this)}>
          <SubgroupChatIcon />
          Subgrupos {this.renderDot() ? <div style={{width: '10px', height: '10px', textAlign: 'center', borderRadius: '50%', backgroundColor: 'red'}}></div> : null}
          {this.state.clicked ? <FontIcon name="sort-down" /> : <FontIcon name="caret-right" />}
        </div>
        {
          this.state.clicked ?
            this.props.chats.map((chat) => {
              return (
                <MessageListUser
                  chat={chat}
                  key={chat._id}
                  sender={this.props.sender}
                  socket={this.props.socket}
                />
              )
            })
            : null
        }
      </div>
    )
  }
}