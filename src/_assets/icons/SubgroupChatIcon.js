import React, { Component } from 'react'
import Icon from './subgroup-chat.svg'

export class SubgroupChatIcon extends Component {
  render(){
    return (
      <div style={{marginRight: '8px'}}>
        <img src={Icon} alt="" />
      </div>
    )
  }
}