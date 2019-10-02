import React from "react"

import { withRouter } from "react-router"

import { connect } from "react-redux"
import * as actions from "../../store/actions"

import { Button } from "../../components/atoms/Button"
import { FontIcon } from "../../components/atoms/FontIcon"

const EventManageButtons = props => {
  const { history, eventStatus, eventId, groupId, style, polls } = props
  const activePoll = polls.filter(poll => !poll.deactivated)

  if (eventStatus === "draft") {
    return (
      <div style={style}>
        <Button
          style={{width: '100%', margin: '5px 0px'}}
          onClick={() =>
            history.push(`/admin/groups/${groupId}/events/${eventId}/newpoll/`)
          }
        >
          <FontIcon name="question-circle" /> Adicionar Enquete
        </Button>
        <Button
          style={{width: '100%', margin: '5px 0px'}}
          onClick={() =>
            history.push({pathname: `/admin/groups/${groupId}/events/${eventId}/editevent/`, state:{action: 'edit'}})
          }
        >
          <FontIcon name="pencil" /> Editar
        </Button>
        <Button style={{width: '100%', margin: '5px 0px'}} onClick={() => history.push({pathname: `/admin/groups/${groupId}/events/${eventId}/editevent/`, state: {action: 'confirm'}})}>
          <FontIcon name="check" /> Revisar
        </Button>
        <Button style={{width: '100%', margin: '5px 0px'}} onClick={() => props.deleteEvent(groupId, eventId)}>
          <FontIcon name="eraser" /> Apagar
        </Button>
      </div>
    )
  } else if (eventStatus === "finished") {
    if(activePoll.length === 0) { 
      return (
        <div style={style}>
          <Button style={{width: '100%', margin: '5px 0px'}} onClick={() => props.deleteEvent(groupId, eventId)}>
            <FontIcon name="eraser" /> Apagar
          </Button>
        </div>
      )
    } else {
      return (
        <div style={style}>
          <Button
            style={{width: '100%', margin: '5px 0px'}}
            onClick={() => props.loadGroupEventPollVotesReport(activePoll[0].groupId, activePoll[0].eventId, activePoll[0]._id)}
          >
            <FontIcon name="paperclip" /> Relatório
          </Button>
          <Button style={{width: '100%', margin: '5px 0px'}} onClick={() => props.deleteEvent(groupId, eventId)}>
            <FontIcon name="eraser" /> Apagar
          </Button>
        </div>
      )
    }
  } else {
    return (
      <div style={style}>
        <Button style={{width: '100%', margin: '5px 0px'}} onClick={() => props.deleteEvent(groupId, eventId)}>
          <FontIcon name="eraser" /> Apagar
        </Button>
      </div>
    )
  }
}

export default withRouter(
  connect(
    null,
    actions
  )(EventManageButtons)
)
