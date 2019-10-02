import React from "react"

import { Field, reduxForm, Form, formValueSelector } from "redux-form"
import { compose } from "redux"
import { connect } from "react-redux"
import * as actions from "../../store/actions"

import { DateTimePicker } from "react-widgets"
import moment from "moment"
import "moment/locale/pt-br"
import momentLocalizer from "react-widgets-moment"
import "react-widgets/dist/css/react-widgets.css"
import InputField from "../../components/molecules/InputField"
import { Button } from "../../components/atoms/Button"
import { FontIcon } from "../../components/atoms/FontIcon"
import { required } from '../../helpers/validation'

moment.locale()
momentLocalizer(moment)

const selector = formValueSelector("newEvent")

const renderDateTimePicker = ({ input: { onChange, value }, showTime }) => (
  <DateTimePicker
    onChange={onChange}
    time={showTime}
    value={!value ? null : new Date(value)}
  />
)

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
  if (type === 'textarea') {
    return (
      <label html={input.name} className="form-control">
        {label}
        <textarea rows={rows} disabled={disabled} {...input} id={`user-${input.name}`} type={type} placeholder={label} maxLength={maxlength}/>
        {touched &&
          ((error && <span className="validateError">{error}</span>) ||
            (warning && <span>{warning}</span>))}
      </label>
    )
  } else {
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
}

class EventsAdd extends React.Component {

  constructor() {
    super()
    this.state = {
      startDateError: null,
      endDateError: null,
      clicked: false,
      group: null
    }
    this.update = this.update.bind(this)
    this.submit = this.submit.bind(this)
  }

  componentDidMount = async () => {
    const { idGroup, idEvent } = this.props.match.params
    let groupResponse = await this.props.getGroupInfo(idGroup)
    this.setState({group: groupResponse.data})
    if (idEvent !== undefined) {
      await this.props.loadEvent(idGroup, idEvent)
      await this.props.initialize(this.props.groupEvent)
    }
  }

  validation() {
    if (this.props.location.state && this.props.location.state.action !== 'add') {
      return required
    } else {
      return null
    }
  }

  update() {
    const { idGroup, idEvent } = this.props.match.params
    this.props.newEvent(
      this.props.newEventForm,
      this.props.userLogged,
      idGroup,
      idEvent,
      () => {
        this.props.history.push(`/admin/groups/${idGroup}/events`)
      }
    )
  }

  submit() {
    if (this.state.clicked === false) {
      this.setState({clicked: true}, () => {
      })
      const { idGroup, idEvent } = this.props.match.params
      var formProps = this.props.newEventForm
      if (typeof formProps.startDate === 'string') {
        formProps.startDate = new Date(formProps.startDate)
      }
      if (typeof formProps.endDate === 'string') {
        formProps.endDate = new Date(formProps.endDate)
      }
      if (formProps.startDate < new Date()) {
        this.setState({startDateError: "A data de início não pode ser inferior a data atual"})
      } else {
        this.setState({startDateError: null})
      }
      if (formProps.endDate < new Date()) {
        this.setState({endDateError: "A data de término não pode ser inferior a data atual"})
      } else if (formProps.startDate > formProps.endDate) {
        this.setState({endDateError: "A data de término não pode ser inferior a data de início"})
      } else {
        this.setState({endDateError: null})
      }
      setTimeout(() => {
        if (this.state.endDateError === null && this.state.startDateError === null) {
          formProps.status = 'confirmed'
        this.props.newEvent(
            formProps,
            this.props.userLogged,
            idGroup,
            idEvent,
            () => {
              this.props.history.push(`/admin/groups/${idGroup}/events`)
            }
          )
        }
      }, 250)
    }
  }

  render() {
    const { handleSubmit, pristine, reset } = this.props
    return (
      <React.Fragment>
        <h3>Eventos</h3>
        <h4 style={{marginBottom: "15px"}}>Cadastrar novo Evento</h4>
        <Form onSubmit={handleSubmit(() => {})}>
          <Field
            validate={this.validation()}
            type="text"
            component={renderField}
            name="name"
            label="Nome do Evento"
            placeholder="Nome do Evento"
            maxlength="100"
          />
          <Field
            validate={this.validation()}
            type="textarea"
            component={renderField}
            name="description"
            label="Descrição do evento"
            placeholder="Descrição do evento"
            maxlength="1000"
            rows={10}
          />
          <div className="eventCalendar">
            <div>
              <label htmlFor="startDate">Data de início</label>
              <Field validate={this.validation()} name="startDate" component={renderDateTimePicker} />
              {
                this.state.startDateError !== null ?
                <span style={{color: "red"}} className="validateError">{this.state.startDateError}</span> :
                null
              }
            </div>
            <div>
              <label htmlFor="endDate">Data final</label>
              <Field validate={this.validation()} name="endDate" component={renderDateTimePicker} />
              {
                this.state.endDateError !== null ?
                <span style={{color: "red"}} className="validateError">{this.state.endDateError}</span> :
                null
              }
            </div>
          </div>
          <Field
            name="suggestions"
            type="checkbox"
            component={InputField}
            label="Sugestões?"
          />
          {
            this.state.group && !(this.state.group.preset === 'casual' || this.state.group.preset === 'free') ?
            <Field
              name="visibleOnlyToVoters"
              type="checkbox"
              component={InputField}
              label="Visivel apenas para votantes?"
            />
            : null
          }
          <div style={{marginTop: "15px"}}>
            <Button type="button" className="button" onClick={()=> {this.update()}}>
              <FontIcon name="arrow-right" /> Salvar
            </Button>
            <Button type="button" disabled={pristine} onClick={reset}>
              <FontIcon name="eraser" /> Apagar
            </Button>
            {
              this.props.location.state && this.props.location.state.action !== 'add' ?
              (<Button type="button" disabled={!this.props.valid} onClick={() => {this.submit()}}>
                <FontIcon name="check" /> Confirmar
              </Button>)
              :
              null
            }
          </div>
        </Form>
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    userLogged: state.auth.userLogged,
    groupEvent: state.groups.groupEvent,
    newEventForm: selector(state, 'name', 'description', 'startDate', 'endDate', 'suggestions', 'visibleOnlyToVoters')
  }
}
export default compose(
  connect(
    mapStateToProps,
    actions
  ),
  reduxForm({ form: "newEvent" })
)(EventsAdd)
