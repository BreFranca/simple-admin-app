import React, { Component } from "react"

import { compose } from "redux"
import { connect } from "react-redux"
import { Field, reduxForm, Form } from "redux-form"

import * as actions from "../store/actions"

// import DashboardAccess from "../components/organisms/DashboardAccess"

import Modal from "react-responsive-modal"
import Card from "../components/atoms/Card"
import Copy from "../components/atoms/Copy"
import Title from "../components/atoms/Title"
import { Table } from "../components/atoms/Table"
import { FontIcon } from "../components/atoms/FontIcon"
import { Button } from "../components/atoms/Button"
import { LinkBtn, LinkButton } from "../components/atoms/LinkButton"
import { LoadingComponent } from '../components/Loading/LoadingComponent'

// const Modal = ({ children, modalClass }) => {
//   return <div className={modalClass}>{children}</div>
// }

function translateRole(role) {
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

const renderField = ({
  input,
  label,
  type,
  validate,
  disabled,
  maxlength,
  rows,
  groupData,
  changing,
  meta: { touched, error, warning }
}) => {
  if (type === 'select') {
    const estilo = {
      border: '1px solid #92919D',
      borderRadius: '3px',
      height: '40px',
      width: '100%',
      marginTop: '5px',
      paddingLeft: '12px',
      fontSize: '15px',
      display: 'block',
      maxWidth: '480px',
    }
    return (
      <label html={input.name} className="form-control">
        {label}
        <select style={estilo} id={`user-${input.name}`} onChange={changing}>
          <option></option>
          {groupData.roles &&
            groupData.roles.map((data, index) => {
              if (data.name !== undefined) {
                return (
                  <option key={index} value={data.name}>
                    {translateRole(data.name)}
                  </option>
                )
              } else {
                return null
              }
            })}
        </select>
      </label>
    )
  }
  return (
    <label html={input.name} className="form-control">
      {label}
      <input disabled={disabled} {...input} id={`user-${input.name}`} type={type} placeholder={label} maxLength={maxlength} />
      {touched &&
        ((error && <span className="validateError">{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </label>
  )
}

class GroupDashboard extends Component {

  constructor() {
    super()
    this.state = {
      modal: false,
      modalDelete: false,
      modalExit: false,
      role: null,
      localLoading: false
    }
  }

  temp = []

  manageModal = (nameModal, visible) => {
    return this.setState({ [nameModal]: visible })
  }

  deleteGroup = () =>
    this.manageModal('modalDelete', true)

  confirmDeleteGroup = () =>
    this.props.deleteGroup(this.props.match.params.idGroup, () => {
    })
      .then(response => {
        const { data } = response
        if (response.status === 500) {
          this.props.setAlert(data.details, 'danger')
        } else if (response.status === 400) {
          this.props.setAlert(data.details, 'danger')
        } else {
          this.props.history.push("/admin/")
          this.props.setAlert('Grupo desativado com sucesso', 'success')
        }
        this.manageModal('modalDelete', false)
      })

  componentDidMount = () => {
    this.setState({localLoading: true})
    this.props.loadGroup(this.props.match.params.idGroup)
      .then(() => {
        if (this.props.groupData.status !== 'active') {
          this.props.history.push('/admin')
          this.props.setAlert('Pendências com o pagamento deste Grupo', 'danger')
        }
      })
    this.props.loadPendingMembers(this.props.match.params.idGroup)
    this.props.showAlert(
      <div style={{ display: 'flex', fontSize: '14px', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          Atenção:&nbsp;
        <span style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={() => this.props.loadPendingMembers(this.props.match.params.idGroup)}>Clique aqui</span>
          &nbsp;e atualize a Lista de Membros Pendentes para ficar ciente de novas solicitações de convites.&nbsp;
        </div>
        <button style={{ cursor: 'pointer', backgroundColor: 'transparent', border: 'none', fontSize: '15px' }} onClick={() => this.props.hideAlert()}><FontIcon name="times" /></button>
      </div>
      , "warning")
  }

  refreshPage() {
    window.location.reload()
  }

  onChange(event) {
    this.setState({ role: event.target.value })
  }

  componentDidUpdate = prevProps => {
    if (this.state.localLoading === true) {
      setTimeout(() => {
        this.checkUpdate()
      }, 500);
    }
    if (this.props.match.params.idGroup !== prevProps.match.params.idGroup) {
      this.setState({localLoading: true})
      this.props.loadGroup(this.props.match.params.idGroup)
        .then(() => {
          if (this.props.groupData.status !== 'active') {
            this.props.history.push('/admin')
            this.props.setAlert('Pendências com o pagamento deste Grupo', 'danger')
          }
        })
      this.props.loadPendingMembers(this.props.match.params.idGroup)
    }
  }

  componentWillUpdate() {
    if (this.state.localLoading === true) {
      this.temp.push()
    }
  }

  checkUpdate() {
    this.temp.pop()
    if (this.temp.length === 0 && this.state.localLoading === true) {
      this.setState({localLoading: false})
    }
  }

  componentWillUnmount() {
    this.props.hideAlert()
  }

  onSubmit = formProps => {
    if (this.state.role !== null) {
      formProps.role = this.state.role
      this.setState({ role: null })
    }
    this.props.manageUser(formProps, this.props.match.params.idGroup, () => {
      this.manageModal('modal', false)
    }).catch((error) => {
      alert(error)
    })
  }

  editUser = (name, id, act, role = "member") => {
    this.props.initialize({
      name,
      role,
      id,
      act
    })
    this.manageModal('modal', true)
  }

  deletePendingUser = (groupId, customerId) =>
    this.props.removeUser(groupId, customerId, "pending")

  deleteMember = (groupId, customerId) =>
    this.props.removeUser(groupId, customerId, "delete")

  exitGroup = () =>
    this.manageModal('modalExit', true)

  confirmExitGroup = (groupId, customer) =>
    this.props.removeUser(groupId, customer._id, "delete")
      .then(response => {
        const { data } = response
        if (response.status === 400 || response.status === 500) {
          this.props.setAlert(data.details, 'danger')
          this.manageModal('modalExit', false)
        } else {
          this.props.history.push('/admin')
        }
        this.manageModal('modalExit', false)
      })
      .catch(e => console.log(e))

  render() {
    const { idGroup } = this.props.match.params
    const {
      groupData,
      groupPendingMembers,
      userLogged,
      handleSubmit
    } = this.props

    const buttons = (
      <div>
        <LinkButton style={{ margin: "0px 4px" }} to={`/admin/groups/${idGroup}/events`}>
          <FontIcon name="list" /> Eventos
        </LinkButton>
        <LinkBtn onClick={() => this.exitGroup()} style={{ background: '#707070', margin: "0px 4px" }}><FontIcon name="sign-out" /> Sair do grupo</LinkBtn>
        <LinkBtn onClick={() => this.deleteGroup()} style={{ background: '#cd4142', margin: "0px 4px" }}><FontIcon name="trash" /> Deletar grupo</LinkBtn>
      </div>
    )

    return (
      <>
      {
        this.state.localLoading === true ? <LoadingComponent /> :
        <Card title={`Dashboard: ${!!groupData && groupData.name}`} customHeader={true} buttons={buttons}>
        <div className="container-dashboard" style={{"flexDirection": "column"}}>
          <div style={{display: "flex", alignItems: "baseline", justifyContent: "flex-end"}}>
            <Title type={'h5'} style={{marginRight: "15px"}}>URL de convite do grupo</Title>
            <Copy link={!!groupData && `${groupData.link}`}>{!!groupData && `${groupData.link}`}</Copy>
          </div>
          <div>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <Title style={{marginBottom: '0px'}} type="h5">
                Lista de membros pendentes
              </Title>
                {/* <LinkBtn onClick={() => this.props.loadPendingMembers(this.props.match.params.idGroup)} style={{margin:"0px 4px", fontSize: '12px'}}><FontIcon name="retweet" /> Atualizar</LinkBtn> */}
                {/* <button><FontIcon name="retweet" />Atualizar</button> */}
            </div>
            <Table style={{tableLayout: "fixed"}}>
              <thead>
                <tr style={{textAlign: "left"}}>
                  <th>Nome</th>
                  <th>E-mail</th>
                  <th>Telefone</th>
                  <th>Ação</th>
                </tr>
              </thead>
              <tbody>
                {!groupPendingMembers.length ? (
                  <tr style={{height: "25px"}}>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
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
          <hr style={{margin: "16px 0px", border: "none", borderBottom: "1px solid #C3C2CE"}}></hr>
          <div>
            <div>
              <Title type="h5">
                Lista de Membros
              </Title>
            </div>
            <Table style={{tableLayout: "fixed"}}>
              <thead>
                <tr style={{textAlign: "left"}}>
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
          onClose={() => this.manageModal('modal', false)}
          center
        >
          <Form onSubmit={handleSubmit(this.onSubmit)}>
            <div className="dashboardIsApprove">
              <p>Defina o Perfil para:</p>
              <Field disabled={true} component={renderField} name="name" type="text" readOnly />
              <label htmlFor="role">Lista de Perfis: </label>
              <Field name="role" component={renderField} type="select" groupData={groupData} changing={this.onChange.bind(this)}>
                {/* {groupData.roles &&
                  groupData.roles.map((data, index) => (
                    <option key={index} value={data.name}>
                      {data.name}
                    </option>
                  ))} */}
              </Field>
              <div>
                <Button type="submit">
                  <FontIcon name="check" /> Confirmar
                </Button>
                <Button type="button" onClick={() => this.manageModal('modal', false)}>
                  <FontIcon name="remove" /> Cancelar
                </Button>
              </div>
            </div>
          </Form>
        </Modal>
        <Modal
          open={this.state.modalExit}
          onClose={() => this.manageModal('modalExit', false)}
          center
        >
          <div style={{textAlign: 'center'}}>
            <h3>Atenção</h3>
            <p>Tem certeza que deseja sair do Grupo?</p>
            <br />
            <Button onClick={() => this.manageModal('modalExit', false)} type="button" color="grey">Voltar</Button>
            <Button type="button" onClick={() => this.confirmExitGroup(idGroup, userLogged)}>Sim, desejo continuar</Button>
          </div>
        </Modal>
        <Modal
          open={this.state.modalDelete}
          onClose={() => this.manageModal('modalDelete', false)}
          center
        >
          <div style={{textAlign: 'center'}}>
            <h3>Atenção</h3>
            <p>Tem certeza que deseja apagar o Grupo?</p>
            <br />
            <Button onClick={() => this.manageModal('modalDelete', false)} type="button" color="grey">Voltar</Button>
            <Button type="button" onClick={() => this.confirmDeleteGroup()}>Sim, desejo continuar</Button>
          </div>
        </Modal>
        {/* <DashboardAccess
          delete={this.deleteGroup}
          event={`/admin/groups/${idGroup}/events`}
          exit={() => this.exitGroup()}
        /> */}
      </Card>
      }
      </>
    )
  }
}

function mapStateToProps(state) {
  return {
    groupPendingMembers: state.groups.groupPendingMembers,
    groupData: state.groups.groupData,
    userLogged: state.auth.userLogged,
    modalStatus: state.ui.modalStatus,
    addMemberError: state.groups.addMemberError
  }
}

export default compose(
  reduxForm({ form: "pendingUser" }),
  connect(
    mapStateToProps,
    actions
  )
)(GroupDashboard)
