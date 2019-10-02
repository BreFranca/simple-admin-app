import React from "react"
import * as actions from "../../store/actions"
import { connect } from "react-redux"

import { FontIcon } from "../../components/atoms/FontIcon"
import { Button } from "../../components/atoms/Button"

const SuggestionActionButton = ({ ...props }) => {
  const {
    suggestionType,
    groupId,
    suggestionId,
    setGroupSuggestionStatus
  } = props
  return (
    <div className="SuggestionMessageButtons">
      {suggestionType !== "active" && (
        <Button
          onClick={() =>
            setGroupSuggestionStatus(groupId, suggestionId, "active")
          }
        >
          <FontIcon name="pencil" /> Ativa
        </Button>
      )}
      {suggestionType !== "bookmarked" && (
        <Button
          onClick={() =>
            setGroupSuggestionStatus(groupId, suggestionId, "bookmarked")
          }
        >
          <FontIcon name="heart" /> Favorite
        </Button>
      )}
      {suggestionType !== "inactive" && (
        <Button
          onClick={() =>
            setGroupSuggestionStatus(groupId, suggestionId, "inactive")
          }
        >
          <FontIcon name="trash" /> Descarte
        </Button>
      )}
    </div>
  )
}

export default connect(
  null,
  actions
)(SuggestionActionButton)
