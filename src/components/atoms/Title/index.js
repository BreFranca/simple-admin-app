import React from "react"

import { TitleContainer } from "./styles"

const Title = (props) => (
    <TitleContainer className={props.type} style={props.style}>
        {props.children}
    </TitleContainer>
)

export default Title