import React, { Component } from "react"

import { connect } from "react-redux"

import * as actions from "../../../store/actions"

class Logout extends Component {
  componentDidMount() {
    this.props.signout(() => this.props.history.push("/login"))
  }

  render() {
    return <div className="auth-wrapper">Voce esta deslogado</div>
  }
}

export default connect(
  null,
  actions
)(Logout)
