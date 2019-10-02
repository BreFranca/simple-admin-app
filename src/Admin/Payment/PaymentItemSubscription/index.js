import React from "react"

import { FontIcon } from "../../../components/atoms/FontIcon"

import { Row } from './styles'

const PaymentItem = (props) => (
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
          <div className="col type"></div>
          {props.payment_method === "credit_card" ?
            <React.Fragment>
              <div className="col finish">Terminado em.</div>
              <div className="col valid">Validade</div>
              <div className="col name">Nome</div>
            </React.Fragment>
          : null}
          <div className="col"></div>
        </div>
        <div className="row">
          <div className="colw">
            <div className="col type">
              <span className="pago">{props.payment_method === "credit_card" ? <React.Fragment><FontIcon name="credit-card" /> Cartão de Crédito</React.Fragment> : <React.Fragment><FontIcon name="file" /> Boleto</React.Fragment> }</span>
            </div>
            {props.payment_method === "credit_card" ?
            <React.Fragment>
              <div className="col finish">
                <span>{props.card_last_digits}</span>
              </div>
                <div className="col valid">
                  <span>{props.expiration_date.slice(0, 2) + '/' + props.expiration_date.slice(2, 4)}</span>
                </div>
              <div className="col name">
                <span>{props.holder_name}</span>
              </div>
            </React.Fragment>
            : null}
          </div>
          {/* <div className="colw">
            <div className="col delete">
              <button><FontIcon name="trash" /></button>
            </div>
          </div> */}
        </div>
      </React.Fragment>
    }
  </Row>
)

export default PaymentItem
