import React from "react"

import { LinkButton } from "../../components/atoms/LinkButton"
import { FontIcon } from "../../components/atoms/FontIcon"

const SuggestionMenuButtons = ({ idGroup }) => {
  return (
    <div style={{marginTop: '15px'}}>
      <LinkButton to={`/admin/suggestion/${idGroup}/active/`}>
        <FontIcon name="pencil" /> Recentes
      </LinkButton>
      <LinkButton to={`/admin/suggestion/${idGroup}/bookmarked/`}>
        <FontIcon name="heart" /> Favoritos
      </LinkButton>
      <LinkButton to={`/admin/suggestion/${idGroup}/inactive/`}>
        <FontIcon name="trash" /> Descartadas
      </LinkButton>
    </div>
  )
}

export default SuggestionMenuButtons
