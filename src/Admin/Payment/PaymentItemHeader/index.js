import React from "react"

import Header from './styles'

const PaymentItem = (props) => (
  <Header>
    <div className="header-item">
      <div className="col status"></div>
      <div className="col cod">Cód.</div>
      <div className="col date">Data de vencimento</div>
      <div className="col date">Data de Pagamento</div>
      {/* <div className="col plan">Plano</div> */}
      <div className="col payment">Modo de Pagamento</div>
      <div className="col payer">Pagador</div>
      <div className="col"></div>
    </div>
  </Header>
)

export default PaymentItem
