import React from "react"

import { FontIcon } from "../atoms/FontIcon"
import { Btn } from "./styles"


const Status = (props) => (
    <Btn className={props.status}>
        {(() => {
        switch(props.status) {
            case 'active':
            return <React.Fragment>Ativo <FontIcon name="check" /></React.Fragment>;
            case 'pending':
            return <React.Fragment>Pendente <FontIcon name="hourglass-half" /></React.Fragment>;
            case 'frozen':
            return <React.Fragment>Congelado <FontIcon name="ban" /></React.Fragment>;
            default:
            return <React.Fragment>Desativado <FontIcon name="times" /></React.Fragment>;
        }
        })()}
    </Btn>
)

export default Status