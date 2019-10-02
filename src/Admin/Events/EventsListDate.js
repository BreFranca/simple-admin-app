import React from 'react'

import { FaCalendarAlt } from 'react-icons/fa'
import moment from 'moment'

const EventsListDate = ({label, eventDate}) => (
  <div>
    <FaCalendarAlt /> <b>{label}</b>: { moment(eventDate).format('LLL') }
  </div>
)

export default EventsListDate;