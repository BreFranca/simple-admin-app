import React, { Component, Fragment } from "react"
import { connect } from "react-redux"

import * as actions from "../../../store/actions"
import { glyToken } from "../../../_helpers"

import { LoggedHeader, RightMenu } from "./styles"
import { LoggedHeaderProfile } from "../../molecules/LoggedHeaderProfile"
import { Alert } from '../../atoms/Alert'
import { FontIcon } from "../../atoms/FontIcon"
import NotifyMenu from "../../molecules/NotifyMenu";

class AdminHeader extends Component {
  componentDidMount = () => {
    glyToken.getToken() && this.props.getUserLogged()
  }
  render() {
    const { userLogged, alert } = this.props
    return (
      <Fragment>
        <LoggedHeader>
          {userLogged ? (
            <Fragment>
              <div />
              <RightMenu>
                <NotifyMenu />
                <LoggedHeaderProfile userLogged={userLogged} />
              </RightMenu>
            </Fragment>
          ) : (
            <Fragment>
              <FontIcon name="spinner" spin />
            </Fragment>
          )}
        </LoggedHeader>
        {alert != null ?
          <Alert message={alert.message} type={alert.type} />
        : null}
      </Fragment>
    )
  }
}

function mapStateToProps(state) {
  const { userLogged } = state.auth
  const { alert } = state.ui
  return {
    userLogged,
    alert
  }
}

export default connect(
  mapStateToProps,
  actions
)(AdminHeader)
