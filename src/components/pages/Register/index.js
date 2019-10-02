import React from "react"
import { reduxForm, Field } from "redux-form"
import InputField from "../../molecules/InputField"

import { compose } from "redux"
import { connect } from "react-redux"

import * as actions from "../../../store/actions"
import { required } from "../../../helpers/validation"

import { HomePanelButton } from "../../molecules/HomePanelButton"

import { Form } from "../../atoms/Form"
import { FontIcon } from "../../atoms/FontIcon"
import { Button } from "../../atoms/Button"

class Register extends React.Component {

  constructor() {
    super()
    this.state = {
      passwordError: null
    }
  }

  componentDidMount = () => {
    if(localStorage.getItem('gly-token-auth')) {
      this.props.history.push("/admin")
    }
  }

  render() {

    const { handleSubmit } = this.props

    const onSubmit = formProps => {
      // this.props.signin(formProps, () => this.props.history.push("/validacao"))
      if (formProps.hashedPassword !== formProps.confirmPassword) {
        this.setState({passwordError: "Senhas não conferem"})
      } else {
        this.setState({passwordError: null})
        delete formProps.confirmPassword
        this.props.signin(formProps).then((result) => {
          this.props.history.push("/validacao")
        }).catch((error) => {
          alert(error)
        })
      }
    }

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h2>Registre-se! É simples e prático</h2>
        <Field
          component={InputField}
          name="name"
          type="text"
          label="Nome"
          validate={required}
          maxlength="100"
        />
        <Field
          component={InputField}
          name="phone"
          type="text"
          label="Telefone"
          validate={required}
          maxlength="15"
        />
        <Field
          component={InputField}
          name="email"
          type="email"
          label="E-mail"
          validate={required}
          maxlength="100"
        />
        <Field
          component={InputField}
          name="hashedPassword"
          type="password"
          label="Senha"
          validate={required}
          maxlength="100"
        />
        <Field
          component={InputField}
          name="confirmPassword"
          type="password"
          label="Confirme a senha"
          validate={required}
          maxlength="100"
        />
        {
          this.state.passwordError !== null ?
          <span style={{color: "red"}} className="validateError">{this.state.passwordError}</span> :
          null
        }
        <HomePanelButton>
          <Field
            component={InputField}
            name="terms"
            type="checkbox"
            label="Concorda com os termos?"
            validate={required}
          />
          <Button className="button" type="submit">
            <FontIcon name="angle-right" /> Registrar
          </Button>
        </HomePanelButton>
      </Form>
    )
  }
}

export default compose(
  connect(
    null,
    actions
  ),
  reduxForm({ form: "register" })
)(Register)
