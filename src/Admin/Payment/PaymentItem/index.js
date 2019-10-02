import React from "react"
import download from '../../../_assets/images/download.png'

import { Row } from './styles'

export const ReturnStatus = (status) => {
  switch (status) {
    case "paid":
      return "PAGO"
    case "waiting_payment":
      return "AGUARD"
    case "refunded":
      return "EXTORNO"
    case "authorized":
      return "PAGO"
    default: 
      return "Não pago"
  }
}

class PaymentItem extends React.Component {

  render() {
    let props = this.props
    return (
      <Row>
        <div className="row">
          {props.notFound ?
            <div className="colw not-found">
              <div className="col">
                {props.notFound}
              </div>
            </div>
            : <React.Fragment>
              <div className="colw">
                <div className={"col status " + props.status}>
                  <span className="pago">{ReturnStatus(props.status)}</span>
                </div>
                <div className="col cod">
                  <span>{props.cod}</span>
                </div>
                <div className="col date">
                  <span>{props.date}</span>
                </div>
                <div className="col date">
                  <span>{props.paid_date}</span>
                </div>
                {/* <div className="col plan">
              <span>{props.plan}</span>
            </div> */}
                <div className="col payment">
                  <span>{props.payment_method}</span>
                </div>
                <div className="col payer">
                  <span>{props.payer}</span>
                </div>
              </div>
              <div className="colw">
                <div className="col">
                  {
                    props.payment_method === 'Cartão de crédito' ? null :
                      <a href={props.boleto_url} target="_blank" rel="noopener noreferrer"><img src={download} alt="download" /></a>
                  }
                </div>
              </div>
            </React.Fragment>
          }
        </div>
      </Row>
    )
  }
}

export default PaymentItem
