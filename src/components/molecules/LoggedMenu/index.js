import React from "react"
import { Link } from "react-router-dom"
import { FontIcon } from "../../atoms/FontIcon"
import { LoggedLinks } from "./styles"

export const LoggedMenu = () => (
  <LoggedLinks>
    <Link to="/admin/usersettings">
      <FontIcon name="cog" />
    </Link>
    <Link to="/admin/help">
      <FontIcon name="question" />
    </Link>
  </LoggedLinks>
)
