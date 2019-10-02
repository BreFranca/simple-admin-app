import React, { Component } from 'react'
import MessageListUser from './MessageListUser'
import { FontIcon } from '../../components/atoms/FontIcon';
import { AdmChatIcon } from '../../_assets/icons/AdmChatIcon';

export class MessageEmployeeList extends Component {

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
      if (chat.chatDetail && chat.chatDetail[this.props.sender].messageunread > 0) {
        temp = true
        break
      }
    }
    return temp
  }

  render() {
    return (
      <div>
        <button className="MessageCategory" onClick={this.onClick.bind(this)}>
          <AdmChatIcon />
          Chat com Administradores {this.renderDot() ? <div style={{width: '10px', height: '10px', textAlign: 'center', borderRadius: '50%', backgroundColor: 'red'}}></div> : null}
          {this.state.clicked ? <FontIcon name="sort-down" /> : <FontIcon name="caret-right" />}
        </button>
        {
          this.state.clicked ?
            this.props.chats.map((chat) => {
              return (
                <MessageListUser
                  key={chat._id}
                  chat={chat}
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