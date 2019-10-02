import React from "react"
import { Link } from "react-router-dom"
import { compose } from "redux"
import { connect } from "react-redux"

import * as actions from "../../../store/actions"
import { required } from "../../../helpers/validation"
import { reduxForm, Field } from "redux-form"

import { Form } from "../../atoms/Form"
import { Button } from "../../atoms/Button"
import InputField from "../../molecules/InputField"
import { HomePanelButton } from "../../molecules/HomePanelButton"
import { FontIcon } from "../../atoms/FontIcon"
import { Variables } from "../../../_helpers/variables";

class Login extends React.Component {
  componentDidMount = () => {
    Variables.sendToken = false
    if(localStorage.getItem('gly-token-auth')) {
      this.props.history.push("/admin")
    } 
    if(localStorage.getItem('auth_remember') === "true"){
      this.props.initialize({  
        phone: localStorage.getItem('gly-customer-phone'),
        hashedPassword: window.atob(localStorage.getItem('gly-aux-react')),
        loginRemember: localStorage.getItem('auth_remember')
      });
    }
  }

  render() {
    const { handleSubmit } = this.props

    const onSubmit = formProps => {
      this.props.signup(formProps, async () => {
        this.props.history.push("/admin")
      })
    }

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h2>Acesse nossa ferramenta!</h2>
        <div style={{alignSelf: "center"}} className="box-error">{this.props.errorMessage}</div>
        <Field
          name="phone"
          type="text"
          component={InputField}
          label="Telefone"
          placeholder="Telefone: 11 11111-1111"
          validate={required}
          maxlength="15"
        />
        <Field
          name="hashedPassword"
          type="password"
          component={InputField}
          label="Senha"
          placeholder="Insira sua senha"
          validate={required}
          maxlength="100"
        />
        <Field
          name="loginRemember"
          type="checkbox"
          component={InputField}
          label="Lembrar senha"
        />

        <HomePanelButton>
          {
            this.props.errorMessage === "Senha inválida" ?
            <Link to={"/validacaosenha"}>Esqueci a senha</Link> :
            null
          }
          <Button style={{alignSelf: "flex-end", marginLeft: "auto"}} className="button" type="submit">
            <FontIcon name="sign-in" /> Login
          </Button>
        </HomePanelButton>
      </Form>
    )
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.errorMessage }
}

export default compose(
  connect(
    mapStateToProps,
    actions
  ),
  reduxForm({
    form: "signup"
  })
)(Login)
