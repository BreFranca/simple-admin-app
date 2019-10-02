import React from "react"
import LinesEllipsis from 'react-lines-ellipsis'
import Status from "../../../components/Status"
import { Card, Image, Content, Category } from "./styles"

const CardGroupDashboard = props => (
  <Card onClick={props.onClick}>
    <Image>
      <img src={props.image} alt={props.name} />
    </Image>
    <Content>
      <div>
        <LinesEllipsis
          component='h4'
          text={props.name}
          maxLine='3'
          ellipsis='...'
          trimRight
          basedOn='letters'
        />
        {/* <h4>{props.name}</h4> */}
        <Category>{props.category}</Category>
         {/* <ul>
          <li>
            <span>Eventos: </span>
            {props.event.length}
          </li>
          <li>
            <span>Membros:</span>
            {props.member.length}
          </li>
        </ul> */}
      </div>
      <div className="status-container">
        <Status status={props.status} />
      </div>
    </Content>
  </Card>
)

export default CardGroupDashboard
