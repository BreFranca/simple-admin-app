import React from "react"
import MessageChat from "../Admin/Messages/MessageChat"
import MessageListUser from "../Admin/Messages/MessageListUser"
import { MessageEmployeeList } from "../Admin/Messages/MessageEmployeeList"
import { MessageDirectList } from "../Admin/Messages/MessageDirectList"
import MessageInput from "../Admin/Messages/MessageInput"
import { LoadingComponent } from '../components/Loading/LoadingComponent'
import { connect } from "react-redux"

import * as actions from "../store/actions"

import io from "socket.io-client"
import { MessageSubgroupList } from "../Admin/Messages/MessagesSubgroupList";

class GroupMessages extends React.Component {

  constructor() {
    super()
    this.state = {
      localLoading: false
    }
  }

  loadCurrentChat = data => {
    console.log(data)
  }
  socket = io(process.env.REACT_APP_SOCKET_URL)

  temp = []

  componentDidMount = async () => {
    this.setState({localLoading: true})
    const { idGroup } = this.props.match.params
    const group = await this.props.loadGroup(idGroup)
    this.props.getGroupChats(idGroup, group.data, this.props.userLogged._id)

    // socket.on("join", data => console.log("on.join", data))
    this.socket.on("connect", () => {
        // console.log("conection ONNNNN")
      }
    )
    this.socket.on("connectionEstabilished", () => {
        // console.log("connectionEstabilished!!!!!!!!!")
      }
    )
    // socket.on("getMessages", data => console.log("$$$$$$ on.getMessages", data))
    this.socket.on("message", data => {
      console.log('recebeu uma mensagem')
      this.props.newSocketChatMessage(data, this.props.groupChats, this.props.selectedChat, this.props.userLogged._id)
    })
    this.socket.on("lastMessages", data => {
        // console.log("###### on.lastMessages", data)
      }
    )
  }

  componentDidUpdate = async (prevProps) => {
    const { idGroup } = this.props.match.params
    if (this.state.localLoading === true) {
      setTimeout(() => {
        this.checkUpdate()
      }, 500);
    }
    if (idGroup !== prevProps.match.params.idGroup) {
      this.setState({localLoading: true})
      this.props.closeChatMessage()
      const group = await this.props.loadGroup(idGroup)
      this.props.getGroupChats(idGroup, group.data)
    }
  }

  componentWillUpdate() {
    if (this.state.localLoading === true) {
      this.temp.push({})
    }
  }

  componentWillUnmount = () => {
    this.socket.disconnect()
    this.props.closeChatMessage()
  }

  checkUpdate() {
    this.temp.pop()
    if (this.temp.length === 0 && this.state.localLoading === true) {
      this.setState({localLoading: false})
    }
  }

  orderChats(chats) {
    let temp = {}
    let categories = ['general', 'employee', 'personal', 'subgroup']
    for (let chat of chats) {
      for (let category of categories) {
        if (chat.category === category) {
          if (!temp[category]) {
            temp[category] = []
          }
          temp[category].push(chat)
          break;
        }
      }
    }
    return temp
  }

  renderChats(allChats, userLogged) {
    let temp = []
    if (allChats.general) {
      temp.push(
        <MessageListUser
          key={0}
          chat={allChats.general[0]}
          sender={userLogged._id}
          socket={this.socket}
          style={{fontSize: '13px', textAlign: 'left'}}
        />
      )
    }
    if (allChats.employee) {
      temp.push(
        <MessageEmployeeList
          key={1}
          chats={allChats.employee}
          sender={userLogged._id}
          socket={this.socket}
        />
      )
    }
    if (allChats.subgroup) {
      temp.push(
        <MessageSubgroupList
          key={3}
          chats={allChats.subgroup}
          sender={userLogged._id}
          socket={this.socket}
        />
      )
    }
    if (allChats.personal) {
      temp.push(
        <MessageDirectList
          key={2}
          chats={allChats.personal}
          sender={userLogged._id}
          socket={this.socket}
        />
      )
    }
    return temp
  }

  render() {
    let currentChat = null
    const { userLogged, groupChats, groupData } = this.props
    let ordered = this.orderChats(groupChats)
    for (let chat of this.props.groupChats) {
      if (this.props.selectedChat !== null && chat._id === this.props.selectedChat.chatId) {
        currentChat = chat
        break
      }
    }
    return (
      <>
      { this.state.localLoading === true ? <LoadingComponent /> : 
      <>
      <h2>Mensagens: {!!groupData && `${groupData.name}`}</h2>
      <div className="Message">
        <div className="MessageChat" style={ groupChats.length === 0 ? {gridTemplateColumns: 'auto'} : {gridTemplateColumns: '300px auto'}}>
          {
            groupChats && groupChats.length === 0 ?
            null :
            <div className="MessageChatList">
              {this.renderChats(ordered, userLogged)}
            </div>
          }
          <div className="MessageChatTalk">
            {groupChats && userLogged ? (
              <MessageChat
                members={groupData.members}
                sender={userLogged._id}
                socket={this.socket}
              />
            ) : null}
          </div>
          {currentChat !== null ? 
          <MessageInput sender={userLogged._id} socket={this.socket} chatId={this.props.selectedChat.chatId} groupId={this.props.selectedChat.groupId} />
          : <div style={{backgroundColor: 'white'}}></div>
        }
        </div>
      </div>
    </>
      }
      </>
    )
  }
}

function mapStateToProps(state) {
  const { userLogged } = state.auth
  const { groupChats, groupData, selectedChat } = state.groups
  return {
    userLogged,
    groupData,
    groupChats,
    selectedChat
  }
}

export default connect(
  mapStateToProps,
  actions,
  null,
  {pure: false}
)(GroupMessages)
