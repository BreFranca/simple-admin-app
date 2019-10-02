import React from "react"
import { Link } from "react-router-dom"
import { FontIcon } from "../../atoms/FontIcon"
import { Container, Mask, Toggle, HeaderProfile, HeaderName, Divider } from "./styles"

const HandleClose = () => {
  const checkbox = document.getElementById('header-checkbox')
  
  checkbox.checked = false
}

export const LoggedHeaderProfile = ({ userLogged }) => (
  <Container>
    <Toggle type="checkbox" id="header-checkbox" />
    <HeaderName htmlFor="header-checkbox">
        {/* <FontIcon name="user" /> */}
        <div className="image" />
        {userLogged.name ? userLogged.name : userLogged.email}
    </HeaderName>
    <HeaderProfile>
      <Link to="/admin/usersettings" onClick={() => HandleClose()}>
        <FontIcon name="pencil-square-o" /> Editar perfil
      </Link>
      {/* <Link to="/admin/payments" onClick={() => HandleClose()}>
        <FontIcon name="folder" /> Meus Pagamentos
      </Link> */}
      {/* <Link to="/admin/usersettings" onClick={() => HandleClose()}>
        <FontIcon name="cog" /> Configurações
      </Link> */}
      <Link to="/admin/help" onClick={() => HandleClose()}>
        <FontIcon name="question" /> Ajuda
      </Link>
      <Divider />
      <Link className="sign-out" to="/logout" onClick={() => HandleClose()}>
        <FontIcon name="sign-out" /> Sair
      </Link>
    </HeaderProfile>
    <Mask onClick={() => HandleClose()} />
  </Container>
)
