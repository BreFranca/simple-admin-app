import React from "react"

import { connect } from "react-redux"

import EventDates from "./EventDates"
import EventTitle from "./EventTitle"
import EventListPolls from "./EventListPolls"
import EventManageButtons from "./EventManageButtons"

import * as actions from "../../store/actions"

const Event = props => {
  const { eventList, eventTitle } = props
  const activeEvent = eventList.filter(event => !event.deactivated)
  if (activeEvent.length === 0) {
    return <div className="eventEmpty">Não há eventos {eventTitle}</div>
  } else {
    return (
      <div>
        <h3 className="dashboardTitle">Eventos {eventTitle}</h3>
        <ul className="eventContainer">
          {activeEvent.map((event, index) => (
            <li className="eventList" key={index}>
              <div>
                <EventTitle style={{width: '100%', textAlign: 'justify', margin: '0px 8px'}} name={event.name} description={event.description} />

                <EventDates
                  style={{width: '25%', textAlign: 'justify', margin: '0px 8px'}}
                  eventStartDate={event.startDate}
                  eventEndDate={event.endDate}
                  history={props.history}
                />

                <EventManageButtons
                  style={{width: '25%', textAlign: 'justify', margin: '0px 8px'}}
                  groupId={event.groupId}
                  polls={event.polls}
                  eventId={event._id}
                  eventStatus={event.status}
                />
              </div>

              <EventListPolls polls={event.polls} eventStatus={event.status} />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default connect(
  null,
  actions
)(Event)
