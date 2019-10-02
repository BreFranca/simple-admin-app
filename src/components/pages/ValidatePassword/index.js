import React from "react"
import { reduxForm, Field } from "redux-form"
import InputField from "../../molecules/InputField"

import { compose } from "redux"
import { connect } from "react-redux"

import * as actions from "../../../store/actions"
import { required } from "../../../helpers/validation"

import { Form } from "../../atoms/Form"
import { Button } from "../../atoms/Button"
import { FontIcon } from "../../atoms/FontIcon"

import { Variables } from '../../../_helpers/variables'

class ValidatePassword extends React.Component {

  constructor() {
    super()
    this.state = {
      error: false,
      errorMessage: ""
    }
  }

  componentDidMount() {
    if(Variables.phone === "" || Variables.phone === null) {
      this.props.history.push("/login")
    } else if(Variables.sendToken === false) {
      Variables.sendToken = true
      this.props.sendToken(`+55${Variables.phone}`)
    }
  }

  onSubmit = formProps => {
    this.props.validateTokenPassword(`+55${Variables.phone}`, formProps.token).then((result) => {
      if (result) {
        Variables.validationPasswordToken = formProps.token
        this.props.history.push("/esquecisenha")
      } else {
        this.setState({
          error: true,
          errorMessage: "Token inválido"
        })
      }
    })
  }

  render() {
  const { handleSubmit } = this.props
    return (
      <Form onSubmit={handleSubmit(this.onSubmit)}>
        <h2>Esqueci a senha</h2>
        Valide o telefone {Variables.phone} com o token enviado para o seu celular
        {
          this.state.error ?
          <div style={{color: "red"}} className="box-error">{this.state.errorMessage}</div> :
          null
        }
        <Field
          component={InputField}
          name="token"
          type="text"
          placeholder="Token"
          validate={required}
          maxlength="4"
        />
        <Button className="button" type="submit">
          <FontIcon name="mobile" /> Validar
        </Button>
      </Form>
    )
  }
}

export default compose(
  connect(
    null,
    actions
  ),
  reduxForm({ form: "validatePassword" })
)(ValidatePassword)