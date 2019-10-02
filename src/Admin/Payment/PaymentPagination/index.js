import React from "react"

import { FontIcon } from "../../../components/atoms/FontIcon"
import Paginate from './styles'

const PaymentPagination = (props) => (
  <Paginate>
    {props.pages ?
      <ul>
        <li className="first"><button><FontIcon name="angle-left" /></button></li>
        {props.pages.map((index) => 
          <li key={index}><button>{index}</button></li>
        )}
        <li className="last"><button><FontIcon name="angle-right" /></button></li>
      </ul>
    : null }
  </Paginate>
)

export default PaymentPagination
