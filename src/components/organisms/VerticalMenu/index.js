import React, { Component } from "react"
import {
  Menu,
  Nav,
  MenuItem,
  SubMenu,
  Toggle,
  SubMenuItem,
  LabelMenu,
  PlansButton
} from "./styles"
import { Link } from "react-router-dom"

import { connect } from "react-redux"

import * as actions from "../../../store/actions"

import { FontIcon } from "../../atoms/FontIcon"
import { LoggedMenu } from "../../molecules/LoggedMenu";

class VerticalMenu extends Component {

  componentDidMount = () => {
    this.props.loggedMenu()
    this.props.getGroups()
  }

  componentDidUpdate = prevProps => {
    if(this.props.listGroups !== prevProps.listGroups) {
    }
  }

  renderMenu(group) {
    for (let member of group.membersGroupInfo) {
      if (member.id === this.props.userLogged._id && member.role === 'admin') {
        return (
          <>
          <SubMenuItem>
            <Link to={`/admin/groups/${group._id}/dashboard`}>
              <FontIcon name="th-large" /> Dashboard
            </Link>
          </SubMenuItem>
          <SubMenuItem>
            <Link to={`/admin/groups/${group._id}/events`}>
              <FontIcon name="calendar-check-o" /> Eventos
            </Link>
          </SubMenuItem>
          <SubMenuItem>
            <Link to={`/admin/suggestion/${group._id}/active/`}>
              <FontIcon name="comment-o" /> Sugestões
            </Link>
          </SubMenuItem>
          <SubMenuItem className="payment">
            <Link to={`/admin/payments/${group._id}/`}>
              <FontIcon name="credit-card-alt" /> Pagamentos
            </Link>
          </SubMenuItem>
          </>
        )
      }
    }
  }

  render() {
    const { listGroups, userLogged } = this.props
    if (listGroups !== undefined && userLogged !== undefined) {
      return (
        <Menu>
          <PlansButton>
            <Link to={'/admin'}>
              <FontIcon name="star" />
              Planos de Assinatura
            </Link>
          </PlansButton>
          <Nav>
            {listGroups &&
              listGroups.map(
                (group, index) => {
                  if (group.status === "deactivated") {
                    return null
                  } else {
                    return (
                      <MenuItem key={index} className={group.status}>
                      <Toggle type="checkbox" id={`subHamburger${index}`} />
                      <LabelMenu htmlFor={`subHamburger${index}`}>
                        {group.name}
                      </LabelMenu>
                      <SubMenu>
                        {
                          this.renderMenu(group)
                        }
                        <SubMenuItem>
                          <Link to={`/admin/messages/${group._id}`}>
                            <FontIcon name="comments" /> Mensagens
                          </Link>
                        </SubMenuItem>
                      </SubMenu>
                    </MenuItem>
                    )
                  }
                }
              )}
          </Nav>
          <LoggedMenu />
          {/* <LinkMenu>
            <Link to={'/admin/payments'}>Configurações</Link>
          </LinkMenu> */}
        </Menu>
      )
    } else {
      return <div className="verticalMenu" />
    }
  }
}

function mapStateToProps(state) {
  const { listGroups, userLogged } = state.auth
  return {
    listGroups,
    userLogged
  }
}

export default connect(
  mapStateToProps,
  actions
)(VerticalMenu)
