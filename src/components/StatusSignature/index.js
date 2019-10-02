import React from "react"

import { FontIcon } from "../atoms/FontIcon"
import { Btn } from "./styles"


const StatusSignature = (props) => (
    <Btn className={props.status}>
        {(() => {
        switch(props.status) {
            case 'paid':
            return <>Pago <FontIcon name="check" /></>;
            case 'unpaid':
            return <>Não pago <FontIcon name="ban" /></>;
            case 'pending_payment':
            return <>Pendente <FontIcon name="hourglass-half" /></>;
            default:
            return <>Cancelado <FontIcon name="times" /></>;
        }
        })()}
    </Btn>
)

export default StatusSignature