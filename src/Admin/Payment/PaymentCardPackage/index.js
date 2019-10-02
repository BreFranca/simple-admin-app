import React from "react"

import { Container } from './styles'

const numberToReal = (numero) => {
    let number = numero.toString().slice(0, -2);
    number = Number(number);
    number = number.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})

    return number;
}

const valuePerMember = (amount, members) => {
    let total = amount.toString().slice(0, -2);
    total = Number(total);
    
    const valuePerMember = total / members

    return valuePerMember.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
}

const PaymentCardPackage = (props) => (
    <Container className={props.discount ? `${props.type} discount` : props.type }>
        <h3>{props.title}</h3>
        <ul>
            <li><span>Número de Membros</span><span>{props.members}</span></li>
            <li><span>Valor por Usuário</span><span>{valuePerMember(props.total, props.members)}</span></li>
            {props.discount ?
                <li><strong>Desconto</strong><strong>{props.discount}%</strong></li>
            : null}
        </ul>
        <ul className="total">
            <li><strong>Valor Total</strong><strong>{numberToReal(props.total)}</strong></li>
        </ul>
    </Container>
)

export default PaymentCardPackage