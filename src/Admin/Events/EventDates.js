import React from 'react'
import EventListDate from './EventsListDate'

const EventDates = ({eventStartDate, eventEndDate, style}) => (
  <div style={style}>
    {eventStartDate && <EventListDate label='Início' eventDate={eventStartDate} />}
    {eventEndDate && <EventListDate label='Encerramento' eventDate={eventEndDate} />}
  </div>
)
export default EventDates