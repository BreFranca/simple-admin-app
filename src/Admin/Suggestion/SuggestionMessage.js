import React from 'react'
import SuggestionActionButtons from './SuggestionActionButtons'

const SugggestionMessage = ({...props}) => {

  return(
    <div className="SuggestionCard">
      <div>        
        <div style={{marginBottom: '10px', fontWeight: '500', fontSize: '18px'}}>
          {props.date}
        </div>

        <div style={{marginBottom: '10px', fontWeight: '500', fontSize: '18px'}}>
          {props.createdBy.name}
        </div>

        <div>
          {props.message}
        </div>
      </div>
      <SuggestionActionButtons {...props} />
    </div>
  )
}

export default SugggestionMessage