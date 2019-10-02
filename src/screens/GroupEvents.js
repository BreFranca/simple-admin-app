import React from "react"
import { connect } from "react-redux"

import * as actions from "../store/actions"

import Event from "../Admin/Events/Event"
import { LinkButton } from "../components/atoms/LinkButton"
import { FontIcon } from "../components/atoms/FontIcon"
import { LoadingComponent } from '../components/Loading/LoadingComponent'

class GroupEvents extends React.Component {

  constructor() {
    super()
    this.state = {
      localLoading: false
    }
  }

  temp = []

  componentDidMount = () => {
    this.setState({localLoading: true})
    this.props.loadEvents(this.props.match.params.idGroup)
  }

  componentDidUpdate = prevProps => {
    if (this.state.localLoading === true) {
      setTimeout(() => {
        this.checkUpdate()
      }, 500);
    }
    if (this.props.match.params.idGroup !== prevProps.match.params.idGroup) {
      this.setState({localLoading: true})
      this.props.loadEvents(this.props.match.params.idGroup)
    }
  }

  componentWillUpdate() {
    if (this.setState.localLoading === true) {
      this.temp.push({})
    }
  }

  checkUpdate() {
    this.temp.pop()
    if (this.temp.length === 0 && this.state.localLoading === true) {
      this.setState({localLoading: false})
    }
  }

  render() {
    const { groupEvents, groupData } = this.props

    return (
      <>
      {
        this.state.localLoading === true ? <LoadingComponent /> :
        <div>
          <h2>Eventos: {!!groupData && `${groupData.name}`}</h2>
          <Event
            eventTitle="finalizados"
            eventList={groupEvents.filter(event => event.status === "finished")} />
          <Event
            eventTitle="publicados"
            eventList={groupEvents.filter(event => event.status === "published")} />
          <Event
            eventTitle="confirmados"
            eventList={groupEvents.filter(event => event.status === "confirmed")}
          />
          <Event
            eventTitle="em rascunho"
            eventList={groupEvents.filter(event => event.status === "draft")} />
          <div className="panelButton">
            <LinkButton
              className="button"
              to={{pathname: `/admin/groups/${this.props.match.params.idGroup}/events/add`, state:{action: 'add'}}} >
              <FontIcon name="list" /> Novo evento
            </LinkButton>
          </div>
        </div>
      }
      </>
    )
  }
}

function mapStateToProps(state) {
  const { groupEvents, groupData } = state.groups
  return {
    groupEvents,
    groupData
  }
}

export default connect(
  mapStateToProps,
  actions
)(GroupEvents)
