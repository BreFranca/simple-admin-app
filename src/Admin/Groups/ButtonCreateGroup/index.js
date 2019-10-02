import React from "react"

import { Button, Icon } from "./styles"

const ButtonCreateGroup = (props) => (
    <Button type="button" onClick={props.onClick} active={props.active} value={props.icon} className={props.icon === props.active ? "active" : null}>
        {props.icon === props.active ?
            <Icon src={require(`../../../_assets/images/icon-check.png`)} alt="Icon" />
        : <Icon src={require(`../../../_assets/images/icon-${props.icon}.png`)} alt="Icon" /> }
        {props.name}
    </Button>
)

export default ButtonCreateGroup