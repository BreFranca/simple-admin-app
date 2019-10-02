import React from "react"
import { withRouter } from "react-router"
import { connect } from "react-redux"

import * as actions from "../../store/actions"
import { Button } from "../../components/atoms/Button"
import { FontIcon } from "../../components/atoms/FontIcon"

const EventListPolls = props => {
  const { polls, history, eventStatus } = props
  const activePoll = polls.filter(poll => !poll.deactivated)

  if (activePoll.length === 0) return <div>Não há enquetes cadastradas</div>
  else {
    return (
      <div>
        Enquetes:
        {activePoll.map((poll, index) => (
          <b key={index}>
            {" "}
            {poll.name}
            {eventStatus === "draft" && (
              <React.Fragment>
                <Button
                  onClick={() =>
                    props.history.push(
                      `/admin/groups/${poll.groupId}/events/${poll.eventId}/editpoll/${poll._id}/poll`
                    )
                  }
                >
                  <FontIcon name="pencil" />
                </Button>
                <Button
                  onClick={() =>
                    props.deleteEventPoll(poll.groupId, poll.eventId, poll._id)
                  }
                >
                  <FontIcon name="eraser" />
                </Button>
              </React.Fragment>
            )}
            {eventStatus === "finished" && (
              <Button
                onClick={() =>
                  history.push(
                    `/admin/groups/${poll.groupId}/events/${poll.eventId}/poll/${poll._id}/showpoll`
                  )
                }
              >
                <FontIcon name="bar-chart" />
              </Button>
            )}
          </b>
        ))}
      </div>
    )
  }
}

export default withRouter(
  connect(
    null,
    actions
  )(EventListPolls)
)
