import React from 'react';

import { Label } from "./styles"

export const Input = (props) => (
    <Label>{props.label}
        <input
            type={props.type}
            name={props.name}
            placeholder={props.placeholder}
            required={props.required}
            onChange={props.onChange}
            onFocus={props.onFocus}
            pattern={props.pattern}
            maxLength={props.maxlength}
        />
    </Label>
)