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

class Reset extends React.Component {

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
    }
  }

  onSubmit = formProps => {
    if(formProps.hashedPassword === formProps.confirmPassword) {
      this.setState({
        error: false
      })
      this.props.postChangePassword(`+55${Variables.phone}`, Variables.validationPasswordToken, formProps.hashedPassword).then((result) => {
        if (result.status === 201) {
          alert("Senha alterada com sucesso! Faça o login com sua nova senha para acessar o ADMIN")
          this.props.history.push("/login")
        }
      })
    } else {
      this.setState({
        error: true,
        errorMessage: "As senhas não podem ser diferentes"
      })
    }
  }

  render() {
    const { handleSubmit } = this.props

    return (
      <Form onSubmit={handleSubmit(this.onSubmit)}>
        <h2>Nova senha</h2>
        {
            this.state.error ?
            <div style={{color: "red"}} className="box-error">{this.state.errorMessage}</div> :
            null
          }
        <Field
          component={InputField}
          name="hashedPassword"
          type="password"
          label="Crie uma nova senha"
          validate={required}
          maxlength="100"
        />
        <Field
          component={InputField}
          name="confirmPassword"
          type="password"
          label="Confirme sua nova senha"
          validate={required}
          maxlength="100"
        />
        <Button className="button" type="submit">
          <FontIcon name="angle-right" /> Enviar
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
  reduxForm({ form: "reset" })
)(Reset)