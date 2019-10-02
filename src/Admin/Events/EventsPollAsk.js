import React from "react"
import { connect } from "react-redux"

import * as actions from "../../store/actions"

class EventsPollAsk extends React.Component {
  componentDidMount = () => {
    const { idGroup, idEvent } = this.props.match.params
    this.props.loadEventPolls(idGroup, idEvent)
  }

  render() {
    return <React.Fragment />
  }
}

function mapStateToProps(state) {
  return state
}

export default connect(
  mapStateToProps,
  actions
)(EventsPollAsk)
