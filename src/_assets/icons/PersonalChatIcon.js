import React, { Component } from 'react'
import Icon from './personal-chat.svg'

export class PersonalChatIcon extends Component {
  render(){
    return (
      <div style={{marginRight: '8px'}}>
        <img src={Icon} alt="" />
      </div>
    )
  }
}