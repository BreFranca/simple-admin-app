import React, { Component } from "react"

import { compose } from "redux"
import { connect } from "react-redux"
import { Field, reduxForm } from "redux-form"

import * as actions from "../../../store/actions"

import DashboardAccess from "../../organisms/DashboardAccess"

import Modal from "react-responsive-modal"
import Card from "../../atoms/Card"
import { Table } from "../../atoms/Table"
import { FontIcon } from "../../atoms/FontIcon"
import { Button } from "../../atoms/Button"

// const Modal = ({ children, modalClass }) => {
//   return <div className={modalClass}>{children}</div>
// }

class Dashboard extends Component {
  state = {
    modal: false
  }

  translateRole(role) {
  const roles = {
      admin: 'Administrador',
      member: 'Membro',
      consierge: 'Consierge',
      employee: 'Colaborador',
      moderator: 'Moderador',
      voteableMember: 'Membro votante'
    }
    return roles[role]
  }

  orderGroups = (groups) => {
    groups = groups.sort((a, b) => {
      const order = { pending: 1, activate: 2, frozen: 3, deactivated: 4 };
      return (order[a.status] || 0) - (order[b.status] || 0);
    })
  }

  manageModal = visible => {
    return this.setState({ modal: visible })
  }
  deleteGroup = () =>
    this.props.deleteGroup(this.props.match.params.idGroup, () =>
      this.props.history.push("/admin/")
    )

  componentDidMount = () => {
    this.props.loadGroup(this.props.match.params.idGroup)
    this.props.loadPendingMembers(this.props.match.params.idGroup)
  }

  componentDidUpdate = prevProps => {
    if (this.props.match.params.idGroup !== prevProps.match.params.idGroup) {
      this.props.loadGroup(this.props.match.params.idGroup)
      this.props.loadPendingMembers(this.props.match.params.idGroup)
    }
  }

  onSubmit = formProps =>
    this.props.manageUser(formProps, this.props.match.params.idGroup, () =>
      this.manageModal(false)
    )

  editUser = (name, id, act, role = "member") => {
    this.props.initialize({
      name,
      role,
      id,
      act
    })
    this.manageModal(true)
  }

  deletePendingUser = (groupId, customerId) =>
    this.props.removeUser(groupId, customerId, "pending")

  deleteMember = (groupId, customerId) =>
    this.props.removeUser(groupId, customerId, "delete")

  render() {
    const { idGroup } = this.props.match.params
    const {
      groupData,
      groupPendingMembers,
      userLogged,
      handleSubmit
    } = this.props

    return (
      <Card title={`Dashboard: {!!groupData && ${groupData.name}`}>
        <div className="container-dashboard">
          <div>
            <h3>URL de convite do grupo</h3>
            <p>{!!groupData && `${groupData.link}`}</p>

            <DashboardAccess
              delete={this.deleteGroup}
              event={`/admin/groups/${idGroup}/events`}
            />
          </div>

          <div>
            <h4>Lista de membros pendentes</h4>
            <Table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>E-mail</th>
                  <th>Telefone</th>
                  <th>Ação</th>
                </tr>
              </thead>
              <tbody>
                {!groupPendingMembers.length ? (
                  <tr>
                    <td colSpan="4">Nao há membros aguardando aprovação</td>
                  </tr>
                ) : (
                  groupPendingMembers.map((member, index) => (
                    <React.Fragment key={index}>
                      <tr>
                        <td>{member.name}</td>
                        <td>{member.email}</td>
                        <td>{member.phone}</td>
                        <td>
                          <Button
                            onClick={() =>
                              this.editUser(member.name, member._id, "approve")
                            }
                          >
                            <FontIcon name="thumbs-up" />
                          </Button>
                          <Button
                            onClick={() =>
                              this.deletePendingUser(groupData._id, member._id)
                            }
                          >
                            <FontIcon name="thumbs-down" />
                          </Button>
                        </td>
                      </tr>
                    </React.Fragment>
                  ))
                )}
              </tbody>
            </Table>
          </div>

          <div>
            <h4>Lista de Membros</h4>
            <Table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>E-mail</th>
                  <th>Telefone</th>
                  <th>Status</th>
                  <th>Ação</th>
                </tr>
              </thead>
              <tbody>
                {groupData.members &&
                  groupData.members.map((member, index) => (
                    <tr key={index}>
                      <td>{member.name}</td>
                      <td>{member.email}</td>
                      <td>{member.phone}</td>
                      {<td>{groupData.membersGroupInfo[index].role}</td>}
                      <td>
                        {userLogged._id !== member._id && (
                          <React.Fragment>
                            <Button
                              onClick={() =>
                                this.editUser(
                                  member.name,
                                  member._id,
                                  "manage",
                                  groupData.membersGroupInfo[index].role
                                )
                              }
                            >
                              <FontIcon name="thumbs-up" />
                            </Button>
                            <Button
                              onClick={() =>
                                this.deleteMember(groupData._id, member._id)
                              }
                            >
                              <FontIcon name="ban" />
                            </Button>
                          </React.Fragment>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        </div>

        {/* <Modal modalClass={modalStatus}> */}
        <Modal
          open={this.state.modal}
          onClose={() => this.manageModal(false)}
          center
        >
          <form onSubmit={handleSubmit(this.onSubmit)}>
            <div className="dashboardIsApprove">
              <p>Defina o Perfil para:</p>
              <Field component="input" name="name" type="text" readOnly />
              <label htmlFor="role">Lista de Perfis: </label>
              <Field name="role" component="select">
                {groupData.roles &&
                  groupData.roles.map((data, index) => (
                    <option key={index} value={data.name}>
                      {this.translateRole(data.name)}
                    </option>
                  ))}
              </Field>
              <div>
                <Button type="submit">
                  <FontIcon name="check" /> Confirmar
                </Button>
                <Button type="button" onClick={() => this.manageModal(false)}>
                  <FontIcon name="remove" /> Cancelar
                </Button>
              </div>
            </div>
          </form>
        </Modal>
      </Card>
    )
  }
}

function mapStateToProps(state) {
  return {
    groupPendingMembers: state.groups.groupPendingMembers,
    groupData: state.groups.groupData,
    userLogged: state.auth.userLogged,
    modalStatus: state.ui.modalStatus
  }
}

export default compose(
  reduxForm({ form: "pendingUser" }),
  connect(
    mapStateToProps,
    actions
  )
)(Dashboard)
