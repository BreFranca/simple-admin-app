import React, { Fragment } from "react"
import { connect } from "react-redux"

import { orderGroups } from "../_helpers"

import * as actions from "../store/actions"
import CardGroupDashboard from "./Groups/CardGroupDashboard"
import { Button } from "../components/Button"
import { FontIcon } from "../components/atoms/FontIcon"

class Homepage extends React.Component {
  state = {
    groups: []
  }
  componentDidMount = () => {
    this.props.getGroups().then(response => {
      const groups = orderGroups(response)
      this.setState({
        groups: groups
      })
    })
  }

  translatePreset(preset) {
    const presets = {
      casual: 'Casual',
      condominium: 'Condomínio',
      free: 'Gratuito',
      company: 'Empresarial',
      syndicate: 'Sindicato'
    }
    return presets[preset]
  }

  render() {
    const { userLogged } = this.props
    const { groups } = this.state
    // const activeGroups = listGroups && listGroups.filter(group => group.status === "active")
    return (
      <Fragment>
        <Button color="no-mg" to="/admin/groups/create">
          <FontIcon name="plus" /> Criar novo Grupo
        </Button>
        <div className="admin-content-list ">
          {/* {activeGroups && */}
            {/* activeGroups.map((group, index) => ( */}
            {groups &&
              groups.map((group, index) => {

                if (!userLogged.viewDeactivatedGroups && group.status === 'deactivated') {
                  return null
                }
                return (
                  <CardGroupDashboard
                    key={index}
                    image={group.image ? group.image : 'https://via.placeholder.com/130x122.png?text=Grupo+Sem+imagem'}
                    name={group.name}
                    category={this.translatePreset(group.preset)}
                    event={group.events}
                    member={group.members}
                    status={group.status}
                    onClick={group.membersGroupInfo.find(m => m.id === userLogged._id).role === "admin" ?group.status === 'active' ? () => this.props.history.push(`/admin/groups/${group._id}/dashboard`) : () => this.props.history.push(`/admin/payments/${group._id}`) : null}
                  />
                )
              }
            )}
        </div>
      </Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    listGroups: state.auth.listGroups,
    userLogged: state.auth.userLogged,
  }
}

export default connect(
  mapStateToProps,
  actions
)(Homepage)
