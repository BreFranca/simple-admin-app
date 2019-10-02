import React from 'react'

import { Container } from './styles'

export const Alert = (props) => (
    props.message ?
        <Container className={props.type}>
            {props.message}
        </Container>
    : null
)