import React, { Component } from 'react'
import Icon from './general-chat.svg'

export class GeneralChatIcon extends Component {
  render(){
    return (
      <div style={{marginRight: '8px'}}>
        <img src={Icon} alt="" />
      </div>
    )
  }
}