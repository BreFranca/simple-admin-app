import React, { Component } from "react"
import { Redirect } from 'react-router-dom'

import { connect } from "react-redux"

export default ChildComponent => {
  class ComposedComponent extends Component {
    state = {
      redirect: false
    }

    componentDidMount() {
      this.shouldNavigateAway()
    }

    componentDidUpdate() {
      this.shouldNavigateAway()
    }

    shouldNavigateAway() {
      if (!this.props.auth) {
        this.setState({
          redirect: true
        })
      }
    }

    renderRedirect = () => {
      if (this.state.redirect) {
        return <Redirect to='/' />
      }
    }

    render() {
      return <React.Fragment>{this.renderRedirect()}<ChildComponent {...this.props} /></React.Fragment>
    }
  }

  function mapStateToProps(state) {
    return { auth: state.auth.authenticated }
  }

  return connect(mapStateToProps)(ComposedComponent)
}
