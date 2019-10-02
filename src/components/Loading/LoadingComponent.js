import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSync } from '@fortawesome/free-solid-svg-icons'
import './LoadingComponentStyle.css'

export class LoadingComponent extends Component {
  render() {
    return (
      <div className="container">
        <div className="text">
          {this.props.message || 'Carregando...'}
        </div>
        <div className="spinner">
          <FontAwesomeIcon icon={faSync} />
        </div>
      </div>
    )
  }
}