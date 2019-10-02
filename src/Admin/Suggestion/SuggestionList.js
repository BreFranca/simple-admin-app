import React from "react"
import { Link } from "react-router-dom"

const SuggestionList = props => {
  return (
    <li>
      <Link
        to={`/admin/suggestion/${props.groupId}/${props.suggestionType}/${
          props.suggestionId
        }`}
      >
        {/* /admin/suggestion/:idGroup/:typeSuggestion/:idSuggestion? */}
        {props.message.length > 50
          ? `${props.message.substring(0, 50)}...`
          : props.message}
        <span>{props.date}</span>
      </Link>
    </li>
  )
}

export default SuggestionList
