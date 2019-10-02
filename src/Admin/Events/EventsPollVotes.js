import React from "react"
import { connect } from "react-redux"
import * as actions from "../../store/actions"

import EventPollResult from "./EventPollResult"

class EventsPollVotes extends React.Component {
  componentDidMount = () => {
    const { idGroup, idEvent, idPoll } = this.props.match.params
    this.props.loadEventPollVotes(idGroup, idEvent, idPoll)
  }

  showVotes = () => {}
  render() {
    const { options, text } = this.props.groupEventPollVotes

    return (
      <React.Fragment>
        <h3>Resultados da Enquete: {text}</h3>
        <EventPollResult results={options} />
      </React.Fragment>
    )
  }
}
function mapStateToProps(state) {
  return { groupEventPollVotes: state.groups.groupEventPollVotes }
}

export default connect(
  mapStateToProps,
  actions
)(EventsPollVotes)
