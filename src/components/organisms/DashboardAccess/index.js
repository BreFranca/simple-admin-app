import React from "react"

import Title from "../../atoms/Title"
import { FontIcon } from "../../atoms/FontIcon"
import { Button } from "../../atoms/Button"
import { LinkButton } from "../../atoms/LinkButton"

const DashboardAccess = props => (
  <React.Fragment>
    <div style={{marginTop: 30}}>
      <Title type={'h5'}>Acesso Rapido</Title>
      <LinkButton to={props.event}>
        <FontIcon name="list" /> Eventos
      </LinkButton>
    </div>
    <Button className="underline" onClick={props.delete}>
      Apagar Grupo
    </Button>
    <Button className="underline" onClick={props.exit}>
      Sair do Grupo
    </Button>
  </React.Fragment>
)

export default DashboardAccess
