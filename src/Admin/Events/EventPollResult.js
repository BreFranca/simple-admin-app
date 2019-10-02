import React, {Fragment} from 'react'

const EventPollResult = ({results}) => {
  if (results === undefined){
    return null
  } else {
    return (
      <ul>
        {results && results.map((vote, index) => (
          <li key={index}>
            <b>{vote.text}</b> {vote.total === undefined ? <Fragment>nenhum voto</Fragment> : <Fragment>{`${vote.total} voto(s)`}</Fragment>}  <EventPollResult results={vote.options} />
          </li>
        ))}
      </ul>
    )
  }
}

export default EventPollResult