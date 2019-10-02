import React, { Component } from "react"

import { compose } from "redux"
import { connect } from "react-redux"
import { Field, reduxForm } from "redux-form"

import * as actions from "../store/actions"

import DashboardAccess from "../Admin/Dashboard/DashboardAccess"

import { FaThumbsUp, FaThumbsDown, FaBan } from "react-icons/fa"

const Modal = ({ children, modalClass }) => {
  return <div className={modalClass}>{children}</div>
}

class Dashboard extends Component {

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
      this.props.handleModal("modalHide")
    )

  editUser = (name, id, act, role = "member") => {
    this.props.initialize({
      name,
      role,
      id,
      act
    })
    this.props.handleModal("modalShow")
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
      modalStatus,
      userLogged,
      handleSubmit
    } = this.props

    return (
      <React.Fragment>
        <h2>Dashboard: {!!groupData && `${groupData.name}`}</h2>
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
            <table>
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
                          <button
                            onClick={() =>
                              this.editUser(() => member.name, member._id, "approve")
                            }
                          >
                            <FaThumbsUp />
                          </button>
                          <button
                            onClick={() =>
                              this.deletePendingUser(groupData._id, member._id)
                            }
                          >
                            <FaThumbsDown />
                          </button>
                        </td>
                      </tr>
                    </React.Fragment>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div>
            <h4>Lista de Membros</h4>
            <table>
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
                            <button
                              onClick={() =>
                                this.editUser(
                                  member.name,
                                  member._id,
                                  "manage",
                                  groupData.membersGroupInfo[index].role
                                )
                              }
                            >
                              <FaThumbsUp />
                            </button>
                            <button
                              onClick={() =>
                                this.deleteMember(groupData._id, member._id)
                              }
                            >
                              <FaBan />
                            </button>
                          </React.Fragment>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        <Modal modalClass={modalStatus}>
          <form onSubmit={() => handleSubmit(this.onSubmit)}>
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
                <button type="submit" className="button">
                  Confirmar
                </button>
                <button
                  type="button"
                  className="button"
                  onClick={() => this.closeModal()}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </form>
        </Modal>
      </React.Fragment>
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
