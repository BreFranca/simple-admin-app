import React from "react"

import InputRange from 'react-input-range'

import 'react-input-range/lib/css/index.css'

import { Slice, Container, SliceContainer } from './styles'

const numberToReal = (numero) => {
  let number = numero.toString().slice(0, -2);
  number = Number(number);
  number = number.toFixed(2).split('.')

  number[0] = "R$ " + number[0].split(/(?=(?:...)*$)/).join('.');

  return number.join(',');
}

const PaymentSlice = (props) => (
  <Slice>
    <p>{props.label}</p>
    <Container style={{height: '54px'}}>
      <SliceContainer>
        <InputRange
          InputRangeClassNames="input-range"
          maxValue={props.maxValue}
          minValue={0}
          value={props.value}
          onChange={props.onChange}
        />
      </SliceContainer>
      {props.members ?
        <div style={{width: '165px'}} className="tooltip">
          <span>{props.members} { props.members > 1 ? "membros" : "membro" }</span>
          <strong>{numberToReal(props.amount)}</strong>
        </div>
      : null}
    </Container>
  </Slice>
)

export default PaymentSlice