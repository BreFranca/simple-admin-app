import React from "react"
import { reduxForm, Field, Form } from "redux-form"

import { compose } from "redux"
import { connect } from "react-redux"
import * as actions from "../store/actions"

import { required } from "../helpers/validation"
import Modal from "../components/Modal"
import { Button } from "../components/atoms/Button"
import Card from "../components/atoms/Card"
import { FontIcon } from "../components/atoms/FontIcon"

import Switch from 'react-switch'

const renderField = ({
  input,
  label,
  type,
  validate,
  disabled,
  maxlength,
  meta: { touched, error, warning }
}) => (
  <label html={input.name} className="form-control">
    {label}
    <input disabled={disabled} {...input} id={`user-${input.name}`} type={type} placeholder={label} maxLength={maxlength}/>
    {touched &&
      ((error && <span className="validateError">{error}</span>) ||
        (warning && <span>{warning}</span>))}
  </label>
)

class UserSettings extends React.Component {

  constructor() {
    super()
    this.state = {
      changePassword: false,
      newPassword: '',
      confirmPassword: '',
      oldPassword: '',
      passwordError: null,
      newPasswordError: null,
      confirmPasswordError: null,
      pass: window.atob(localStorage.getItem('gly-aux-react')),
      viewDeactivatedGroups: true
    }
    this.changePassword = this.changePassword.bind(this)
    this.onChange = this.onChange.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
  }

  handleInitialize = () => {
    this.props.getUserLogged()
    this.props.initialize(this.props.userLogged)
    this.setState({viewDeactivatedGroups: this.props.userLogged ? this.props.userLogged.viewDeactivatedGroups : true})
  }

  handleDelete = (customer) => {
    this.props.deleteCustomer(customer)
    .then(response => {
      const { data } = response
      if(response.status >= 400) {
        this.handleModal('modalClose')
        this.props.setAlert(data.details, "danger")
      } else {
        this.handleModal('modalClose')
        this.props.setAlert("Conta excluída com sucesso", "success")
        this.props.signout(() => this.props.history.push('/'))
      }
    })
  }

  onSubmit = props => {
    props.viewDeactivatedGroups = this.state.viewDeactivatedGroups
    if (
    this.state.changePassword === false ||
    (this.state.passwordError === null &&
    this.state.newPasswordError === null &&
    this.state.confirmPasswordError === null &&
    this.state.changePassword === true)) {
      this.props.updateRole(props, this.state.newPassword, () => {
        this.props.setAlert("Perfil atualizado com sucesso", "success")
      })
    } else {
      this.props.setAlert("Verifique as informações", "danger")
    }
  }

  componentDidMount() {
    this.handleInitialize()
  }

  handleModal = (statusModal) => {
    this.props.handleModal(statusModal)
  }

  changePassword () {
    let temp = !this.state.changePassword
    if (temp === false) {
      this.setState({
        passwordError: null,
        newPasswordError: null,
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      })
    }
    this.setState({changePassword: temp})
  }

  onChange(event) {
    this.setState({[event.target.name]: event.target.value}, () => {
      if (this.state.oldPassword === '' || this.state.oldPassword === this.state.pass) {
        this.setState({passwordError: null})
      } else {
        this.setState({passwordError: "Senha incorreta"})
      }
      if (this.state.newPassword === this.state.confirmPassword) {
        this.setState({newPasswordError: null})
      } else {
        this.setState({newPasswordError: "Nova senha e sua confirmação não coincidem"})
      }
    })
  }

  handleToggle(event) {
    this.setState({viewDeactivatedGroups: event})
  }

  render() {
    const { handleSubmit } = this.props

    return (
      <Card title={"Configurações"}>
        {/* <Form> */}
        <Form onSubmit={handleSubmit(this.onSubmit)}>
          <Field
            type="text"
            component={renderField}
            name="name"
            label="Nome"
            validate={required}
            maxlength="100"
          />
          <Field
            type="text"
            component={renderField}
            name="email"
            label="E-mail"
            validate={required}
            maxlength="100"
          />
          {/* <Field
            type="text"
            component={renderField}
            name="phone"
            label="Telefone"
            disabled={true}
            validate={required}
            maxlength="15"
          /> */}
          {/* <Field
            type="password"
            component={renderField}
            name="hashedPassword"
            label="Senha"
            maxlength="32"
          /> */}

          <Button style={{marginBottom: "15px"}} type="button" onClick={this.changePassword}>
            <FontIcon name="key" style={{transform: "rotate(90deg)"}} /> Alterar Senha
          </Button>
          {
            this.state.changePassword === true ?
            <div>
              <label className="form-control">
                Senha antiga
                <input
                value={this.state.oldPassword}
                name="oldPassword"
                type="password"
                placeholder="Senha antiga"
                maxLength="32"
                onChange={this.onChange}
                />
                {
                  this.state.passwordError ?
                  <span className="validateError">{this.state.passwordError}</span> :
                  null
                }
              </label>
              <label className="form-control">
                Nova senha
                <input
                value={this.state.newPassword}
                name="newPassword"
                type="password"
                placeholder="Nova senha"
                maxLength="32"
                onChange={this.onChange}
                />
                {
                  this.state.newPasswordError ?
                  <span className="validateError">{this.state.newPasswordError}</span> :
                  null
                }
              </label>
              <label className="form-control">
                Confirme a nova senha
                <input
                value={this.state.confirmPassword}
                name="confirmPassword"
                type="password"
                placeholder="Confirme a nova senha"
                maxLength="32"
                onChange={this.onChange}
                />
              </label>
          </div> :
            null
          }
          <hr style={{margin: "16px 0px", border: "none", borderBottom: "1px solid #C3C2CE"}}></hr>
          <h2>
            Grupos desativados
          </h2>
          <label style={{display: 'flex', alignItems: 'center', margin: '15px 0px'}}>
            <span style={{marginRight: '15px'}}>Não mostrar</span>
            <Switch onChange={(event) => this.handleToggle(event)} uncheckedIcon={null} checkedIcon={null} checked={this.state.viewDeactivatedGroups} offColor="#808080" onColor="#43425b" />
            <span style={{marginLeft: '15px'}}>Mostrar</span>
          </label>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>  
            <Button style={{color: '#c61b1c', fontSize: '15px', fontWeight: 'bold'}} type="button" className="underline" onClick={() => this.handleModal('modalShow')}>Excluir conta</Button>
            <Button type="submit">
              <FontIcon name="pencil" /> Alterar informações
            </Button>
          </div>
        </Form>
        <Modal className="center">
          <h3>Atenção!!</h3>
          <p>Ao excluir a conta, você não terá acesso a sua conta
            <br />Para excluir a conta, precisa transferir os grupos que você é dono para outros membros, ou excluir o grupo.
            <br />Depois da exclusão, poderá criar uma nova conta com o mesmo número de celular cadastrado.</p>
          <Button onClick={() => this.handleModal('modalClose')} type="button" color="grey">Voltar</Button>
          <Button type="button" onClick={() => this.handleDelete(this.props.userLogged)}>Sim, desejo continuar</Button>
        </Modal>
      </Card>
    )
  }
}

function mapStateToProps(state) {
  return {
    userLogged: state.auth.userLogged
  }
}

export default compose(
  reduxForm({
    form: "UserSettings"
  }),
  connect(
    mapStateToProps,
    actions
  )
)(UserSettings)
