import React from "react"

import Status from "../../../components/Status"

import { Card } from "./styles"

const PaymentSubscriptionCard = (props) => (
    <Card>
        <h3>{props.title}</h3>
        <p><strong>Assinatura: </strong>{props.plan}</p>
        {props.status ?
            <Status status={props.status} />
        : null}
    </Card>
)

export default PaymentSubscriptionCard