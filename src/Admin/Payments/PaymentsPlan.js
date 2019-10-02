import React from "react"
import { Button } from '../../components/atoms/Button'

const PaymentPlan = (props) => {
  const { name, amount, days, installments, trial_days, payments, onClick } = props
  return (
    <React.Fragment>
      <br/>
      <h4>Plano {name}</h4>
      {payments ?
        <div><strong> Forma{payments.length > 0 ? 's' : null} de Pagamento:</strong> {payments.map((payment, name) => payment.replace('_', ' ') + ', ')}</div>
      : null }
      <div><strong>Valor: </strong>{amount.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</div>
      <div><strong>Dias: </strong>{days}</div>
      <div><strong>Parcelas: </strong>{installments}</div>
      <div><strong>Dias de teste: </strong>{trial_days}</div>
      <Button onClick={onClick}>Assinar plano</Button>
      <br/>
    </React.Fragment>
  )
}

export default PaymentPlan