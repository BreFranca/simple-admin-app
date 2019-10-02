import React from "react"

import { FontIcon } from "../../../components/atoms/FontIcon"

import { Button } from "../../../components/Button"
import Status from "../../../components/Status"
import StatusSignature from "../../../components/StatusSignature"


import Header from './styles'

const PaymentCardHeader = (props) => { 
  return (
  <Header className="header">
    <div className="top">
      <h3>{props.title}{props.name ? <React.Fragment> - <span style={{wordBreak: 'break-word'}}>{props.name}</span></React.Fragment> : null}</h3>
      {props.type === "extract" ?
        <div className="buttons-container">
        { props.status === 'active' ? <Button color="success" to={`/admin/payments/${props.idGroup}/upgrade`}>FAZER UPGRADE! <FontIcon name="star" /></Button> : null }
        {props.createdBy === props.userLogged ? <Button onClick={props.transfer} color='primary'><FontIcon name="exchange" style={{fontSize: '14px'}} /> Transferir Grupo</Button> : null}
        {props.deleteGroup && props.status !== 'deactivated' ? <Button color="red" onClick={props.deleteGroup}><FontIcon name="trash" style={{fontSize: '14px'}} /> Apagar Grupo</Button> : null}
        </div>
      : <div className="buttons-container">
          {props.modify ?
          <Button to={`/admin/payments/${props.idGroup}/modify`}>Modificar pagamento</Button>
          : null }
          {props.signatureStatus !== 'canceled' ?
            <Button onClick={() => props.onClickCancel()}>Cancelar assinatura</Button>
          : null}
        </div>
      }
    </div>
    { props.header ? props.signatureHeader ?
      <div className="bottom">
        <div className="type">
          <h4>Tipo de assinatura: <span>{props.plan}</span></h4>
        </div>
        <div className="status">
          <h4>Status da Assinatura: <StatusSignature status={props.signatureStatus} /></h4>
        </div>
      </div> :
      <div className="bottom">
        <div className="status">
          <h4>Status do Grupo: <Status status={props.status} /></h4>
        </div>
      </div>
      : null
   }
  </Header>
)
  }

export default PaymentCardHeader
