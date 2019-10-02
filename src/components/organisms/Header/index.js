import React from "react"
import { Link } from "react-router-dom"

import Logo from "../../atoms/Logo"
import { StyledFormHeader, StyledContentHeader } from "./styles"
import { FontIcon } from "../../atoms/FontIcon"

export const ContentHeader = (props) => (
  <StyledContentHeader>
    <Logo />
    <Links loggedUser={props.logged} />
  </StyledContentHeader>
)

export const FormHeader = () => (
  <StyledFormHeader>
    <Logo />
    <Links />
  </StyledFormHeader>
)

const Links = (props) => (
  <div>
    <Link to={"/login"}>
      <FontIcon name="sign-in" /> Fazer Login
    </Link>
    {props.loggedUser ? null :
      <Link to={"/registro"}>
        <FontIcon name="user-plus" /> Cadastre-se
      </Link>
    }
  </div>
)
