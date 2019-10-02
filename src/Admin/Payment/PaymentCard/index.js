import React from "react"

import Card from './styles'

const PaymentCard = (props) => (
  <Card>
    <div className="card-content">
      {props.children}
    </div>
  </Card>
)

export default PaymentCard
