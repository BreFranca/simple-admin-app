import React from 'react';

import { Input } from "./styles"

export const PaymentInput = (props) => (
    <Input>{props.label}
        <input
            type={props.type}
            name={props.name}
            placeholder={props.placeholder}
            required={props.required}
            onChange={props.onChange}
            onFocus={props.onFocus}
            pattern={props.pattern}
            maxLength={props.maxLength}
        />
    </Input>
)