import React from "react"

import IconNotify from "../../../_assets/images/icon-notify.png"

import { Container } from "./styles"

class NotifyMenu extends React.Component {
    render() {
        return(
            <Container>
                <img src={IconNotify} alt="Notificação" />
            </Container>
        )
    }
}

export default NotifyMenu