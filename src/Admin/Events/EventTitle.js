import React from 'react'

const EventTitle = ({name, description, style}) => (
  <div style={style}>
    {name ? <h3>{name}</h3> : <h4>Sem título</h4>}
    {description && <h5>{description}</h5>}
  </div>
)
export default EventTitle