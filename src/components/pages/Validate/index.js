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

const Validate = props => {
  const { validation, handleSubmit } = props

  const onSubmit = formProps => {
    props.validateToken(formProps, () => {
      props.history.push("/login")
    })
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h2>Último passo, valide seu cadastro =)</h2>
      <label htmlFor="">
        Valide o telefone {!!validation && validation.phone} com o token enviado
        para seu celular
      </label>
      <Field
        name="tokenValidation"
        type="text"
        component={InputField}
        maxlength="4"
        validate={required}
      />
      <Button className="button" type="submit">
        <FontIcon name="mobile" /> Validar
      </Button>
    </Form>
  )
}

function mapStateToProps(state) {
  return {
    validation: state.auth.validation
  }
}
export default compose(
  connect(
    mapStateToProps,
    actions
  ),
  reduxForm({
    form: "validate"
  })
)(Validate)
