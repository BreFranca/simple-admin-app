import React from "react"

import { Row } from "./styles"

const numberToReal = (numero) => {
    let number = numero.toString().slice(0, -2);
    number = Number(number);
    number = number.toFixed(2).split('.')
  
    number[0] = "R$ " + number[0].split(/(?=(?:...)*$)/).join('.');
  
    return number.join(',');
}

export const GroupSubscriptionResume = (props) => (
    <Row>
        {props.notFound ?
            <div className="row">
                <div className="colw not-found">
                    <div className="col">
                        {props.notFound}
                    </div>
                </div>
            </div>
        :
            <React.Fragment>
            <div className="header-item">
                <div className="col name">Nome do Grupo</div>
                <div className="col category">Categoria</div>
                <div className="col package">Pacote</div>
                <div className="col value">Valor</div>
            </div>
            <div className="row">
                <div className="col name">
                    <span>{props.name}</span>
                </div>
                <div className="col category">
                    <span>{props.category}</span>
                </div>
                <div className="col package">
                    <span>{props.package}</span>
                </div>
                <div className="col value">
                    <span>{props.amount ? numberToReal(props.amount) : null }</span>
                </div>
            </div>
            </React.Fragment>
        }
  </Row>
)