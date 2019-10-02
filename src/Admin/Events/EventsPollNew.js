import React from "react"
import { compose } from "redux"
import { connect } from "react-redux"
import { Field, FieldArray, reduxForm, Form } from "redux-form"

import * as actions from "../../store/actions"

import eventsValidation from "./eventsValidation"
import { required } from "../../helpers/validation"
import { Button } from "../../components/atoms/Button"
import { FontIcon } from "../../components/atoms/FontIcon"

const renderField = ({
  input,
  label,
  type,
  validate,
  disabled,
  maxlength,
  rows,
  meta: { touched, error, warning }
}) => {
  return (
    <label html={input.name} className="form-control">
      {label}
      <input disabled={disabled} {...input} id={`user-${input.name}`} type={type} placeholder={label} maxLength={maxlength}/>
      {touched &&
        ((error && <span className="validateError">{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </label>
  )
}

const renderQuestion = ({ fields }) => (
  <React.Fragment>
    <React.Fragment>
      <Button
        style={{marginBottom: '15px'}}
        onClick={() => {
          fields.push({})
          fields.length < 2 && fields.push({})
        }}
      >
        <FontIcon name="plus-circle" /> Adicionar pergunta
      </Button>
    </React.Fragment>

    <ul className="eventPollListQuestion">
      {fields.map((quest, index) => (
        <li key={index}>
          <Field
            name={`${quest}.text`}
            type="text"
            component={renderField}
            label="Resposta"
            maxlength="100"
            validate={required}
          />
          <Button onClick={() => fields.remove(index)}>
            <FontIcon name="eraser" /> Apagar Resposta
          </Button>
          <Button onClick={() => fields.push({})}>
            <FontIcon name="book" /> Adicionar Resposta
          </Button>

          <FieldArray name={`${quest}.options`} component={renderQuestion} />
        </li>
      ))}
    </ul>
  </React.Fragment>
)

class EventsPollNew extends React.Component {
  /* envio form */
  onSubmit = formProps => {
    const { idGroup, idEvent, idPoll } = this.props.match.params

    this.props.manageEventPoll(formProps, idGroup, idEvent, idPoll, () =>
      this.props.history.push(`/admin/groups/${idGroup}/events`)
    )
  }

  componentDidMount = async () => {
    const { idGroup, idEvent, idPoll } = this.props.match.params
    if (idPoll !== undefined) {
      await this.props.loadEventPoll(idGroup, idEvent, idPoll)
      this.props.initialize(this.props.groupEventPoll)
    } else {
      this.props.initialize({ options: [{}, {}] })
    }
  }

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props

    return (
      <Form onSubmit={handleSubmit(this.onSubmit)}>
        <Field
          name="name"
          type="text"
          component={renderField}
          label="Nome da enquete"
          validate={required}
          maxlength="100"
        />

        <Field
          name="description"
          type="text"
          component={renderField}
          label="Descrição da enquete"
          validate={required}
          maxlength="1000"
        />

        <Field
          name="question"
          type="text"
          component={renderField}
          label="Nome da pergunta"
          maxlength="100"
          validate={required}
        />

        <FieldArray name="options" component={renderQuestion} />

        <div className="eventPollIconSubmit">
          <Button type="submit" disabled={!this.props.valid}>
            <FontIcon name="send" /> Enviar
          </Button>
          <Button
            type="button"
            disabled={pristine || submitting}
            onClick={reset}
          >
            <FontIcon name="eraser" />
            Apagar
          </Button>
          <Button
            type="button"
            onClick={() =>
              this.props.history.push(
                `/admin/groups/${this.props.match.params.idEvent}/events`
              )
            }
          >
            <FontIcon name="arrow-left" />
            Voltar
          </Button>
        </div>
      </Form>
    )
  }
}

function mapStateToProps(state) {
  const { groupEventPoll } = state.groups
  return {
    groupEventPoll
  }
}

export default compose(
  connect(
    mapStateToProps,
    actions
  ),
  reduxForm({
    form: "newPoll",
    eventsValidation
  })
)(EventsPollNew)
