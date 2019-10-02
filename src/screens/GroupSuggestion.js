import React, { Component } from "react"

import { connect } from "react-redux"

import SuggestionMessage from "../Admin/Suggestion/SuggestionMessage"
import SuggestionMenuButtons from "../Admin/Suggestion/SuggestionMenuButtons"
import { LoadingComponent } from '../components/Loading/LoadingComponent'
import moment from "moment"

import * as actions from "../store/actions"

class GroupSuggestion extends Component {

  constructor() {
    super()
    this.state = {
      localLoading: false
    }
  }

  temp = []

  componentDidUpdate(prevProps) {
    if (this.state.localLoading === true) {
      setTimeout(() => {
        this.checkUpdate()
      }, 500);
    }
    if (prevProps.match.params.idGroup !== this.props.match.params.idGroup) {
      this.setState({localLoading: true})
      this.props.loadGroupSuggestions(this.props.match.params.idGroup)
    }
  }

  componentDidMount() {
    const { idGroup } = this.props.match.params
    this.setState({localLoading: true})
    this.props.loadGroupSuggestions(idGroup)
  }

  componentWillUpdate() {
    if (this.state.localLoading === true) {
      this.temp.push({})
    }
  }

  checkUpdate() {
    this.temp.pop()
    if (this.temp.length === 0 && this.state.localLoading === true) {
      this.setState({localLoading: false})
    }
  }

  renderSuggestions(suggestions, typeSuggestion) {
    let array = []
    for(let current of suggestions) {
      if (current.status === typeSuggestion) {
        array.push(
          <SuggestionMessage
            key={current._id}
            date={moment(current.createdAt).format("DD/MM/YYYY")}
            message={current.content}
            groupId={current.groupId}
            suggestionId={current._id}
            suggestionType={current.status}
            createdBy={current.createdBy}
          />
        )
      }
    }
    return array
  }

  renderType(type) {
    if(type === 'bookmarked') {
      return 'Favoritos'
    } else if (type === 'active') {
      return 'Recentes'
    } else {
      return 'Descartadas'
    }
  }

  render() {
    const { groupSuggestions, groupData } = this.props
    const { idGroup, typeSuggestion } = this.props.match.params
    return (
      <>
      {
        this.state.localLoading === true ? <LoadingComponent /> : 
        <>
          <h2>Sugestões: {!!groupData && `${groupData.name}`}</h2>

          <SuggestionMenuButtons idGroup={idGroup} />

          <h1 style={{marginTop: '15px', color: '#43425b'}}>
            {this.renderType(typeSuggestion)}
          </h1>

          <div className="SuggestionBox">
            {this.renderSuggestions(groupSuggestions, typeSuggestion)}
          </div>
        </>
      }
      </>
    )
  }
}

function mapStateToProps(state) {
  const { groupSuggestions, groupData } = state.groups
  return {
    groupSuggestions,
    groupData
  }
}

export default connect(
  mapStateToProps,
  actions
)(GroupSuggestion)
