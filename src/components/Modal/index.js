import React, { Component } from "react"
import { connect } from "react-redux"
import * as actions from "../../store/actions"

import { ModalContainer, Mask, ModalContent } from "./styles"

class Modal extends Component {
    handleClose = () => {
        this.props.handleModal('modalClose')
    }

    render() {
        const { className, modalStatus } = this.props

        return(
            <ModalContainer className={className ? className + " " + modalStatus : modalStatus}>
                <Mask onClick={() => this.handleClose} />
                <ModalContent>{this.props.children}</ModalContent>
            </ModalContainer>
        )
    }
}

function mapStateToProps(state) {
  const { modalStatus } = state.ui
  return {
    modalStatus
  }
}

export default connect(
  mapStateToProps,
  actions
)(Modal)
