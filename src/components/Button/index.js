import React from "react"

import { Link } from "react-router-dom"
import { Btn } from "./styles"

export const Button = (props) => (
    <Btn className={props.color}>
        {props.to
            ? <Link to={props.to}>{props.children}</Link>
            : <button disabled={props.disabled} type={props.type} onClick={props.onClick}>{props.children}</button>
        }
    </Btn>
)