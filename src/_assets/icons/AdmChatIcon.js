import React, { Component } from 'react'
import Icon from './adm-chat.svg'

export class AdmChatIcon extends Component {
  render(){
    return (
      <div style={{marginRight: '8px'}}>
        <img src={Icon} alt="" />
      </div>
    )
  }
}