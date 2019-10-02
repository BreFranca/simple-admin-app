import React from 'react'

import { FaArrowAltCircleRight } from "react-icons/fa"

import { CollapseContainer, CollapseCheck, CollapseLabel, CollapseContent } from './styles'

const HandleExpand = (target) => {
    const checkbox = document.getElementById(target)
    if(checkbox.checked) {
        checkbox.checked = false
    } else {
        checkbox.checked = true
    }
}

const Accordion = ({target, label, children}) => (
    <CollapseContainer>
        <CollapseCheck type="checkbox" id={`accordion-${target}`} />
        <CollapseLabel onClick={() => HandleExpand('accordion-' + target)}><FaArrowAltCircleRight /><span>{label}</span></CollapseLabel>
        <CollapseContent>{children}</CollapseContent>
    </CollapseContainer>
)

export default Accordion