import React from "react"

import { Container, Header, CustomHeader } from './styles'

const Card = (props) => (
  <Container>
    <div className="card-content">
      {
        props.customHeader === true ?
        <CustomHeader>
          <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <h3>{props.title}{props.name ? <React.Fragment> - <span>{props.name}</span></React.Fragment> : null}</h3>
            {props.buttons}
            {/* <div>
              <button>Primeiro botao</button>
              <button>Segundo botao</button>
              <button>Terceiro botao</button>
            </div> */}
          </div>
          <hr style={{margin: "16px 0px", border: "none", borderBottom: "1px solid #C3C2CE"}}></hr>
        </CustomHeader>
        :
        <Header className="header">
          <div className="top">
            <h3>{props.title}{props.name ? <React.Fragment> - <span>{props.name}</span></React.Fragment> : null}</h3>
          </div>
        </Header>
      }
      {props.children}
    </div>
  </Container>
)

export default Card
