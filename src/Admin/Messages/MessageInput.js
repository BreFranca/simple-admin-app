import React, { Component } from "react"

export default class MessageInput extends Component {
  constructor() {
    super()
    this.state = {
      message: ''
    }
  }

  componentWillMount() {
    document.addEventListener("keydown", (event) => {
      if ((event.keyCode === 13 && event.ctrlKey) && this.state.message !== '') {
        this.submit()
      }
    })
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", (event) => {
      if ((event.keyCode === 13 && event.ctrlKey) && this.state.message !== '') {
        this.submit()
      }
    })
  }

  submit() {
    this.props.socket.emit("message", {
      chatId: this.props.chatId,
      groupId: this.props.groupId,
      sender: this.props.sender,
      content: this.state.message
    })
    this.setState({message: ''})
  }

  onChange(event) {
    this.setState({message: event.target.value})
  }

  render() {
    return (
      <div style={{display: 'flex', alignItems: 'center', boxShadow: 'rgba(0, 0, 0, .16) 0px -2px 4px', zIndex: '100', backgroundColor: 'white'}}>
        <input
          style={{width: '100%', height: '50px', font: '15px arial, normal', padding: '15px', border: 'none', backgroundColor: '#fdfdfd'}}
          placeholder="Digite aqui sua mensagem... (Ctrl + Enter para enviar)"
          onChange={this.onChange.bind(this)}
          value={this.state.message}
          />
        <div style={{fontSize: '17px', color: '#3D90FA', fontWeight: 'bold', margin: '0px 20px', cursor: 'pointer'}} onClick={this.submit.bind(this)}>
          ENVIAR
        </div>
      </div>  
    )
  }
}

// const MessageInput = props => {
//   const {
//     currentChat,
//     sender,
//     handleSubmit,
//     pristine,
//     submitting,
//     socket
//   } = props

//   const messageSubmit = formProps =>
//     socket.emit("message", {
//       chatId: currentChat.chatId,
//       groupId: currentChat.groupId,
//       sender,
//       content: formProps.content
//     })

//   return (
//     <Form onSubmit={handleSubmit(messageSubmit)} style={{display: 'flex', alignItems: 'center'}}>
//       <input
//         type="text"
//       />
//       <Button disabled={pristine || submitting}>
//         ENVIAR
//       </Button>
//     </Form>
//   )
// }