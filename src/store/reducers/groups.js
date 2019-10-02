import * as types from "../constants"

const initialState = {
  groupData: "",
  groupInfo: {},
  groupMembers: [],
  groupPendingMembers: [],
  groupEvents: [],
  groupEvent: {},
  groupEventPoll: {},
  groupEventPollVotes: {},
  groupSuggestions: [],
  groupChats: [],
  groupChatCurrent: [],
  groupSubscriptions: [],
  groupSubscription: [],
  newGroup: {},
  selectedChat: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_GROUP_EVENTS || types.SET_GROUP_EVENTS:
      return { ...state, groupEvents: action.payload }
    case types.GET_GROUP_EVENT:
      return { ...state, groupEvent: action.payload }
    case types.GET_GROUP_PENDING_MEMBERS:
      return { ...state, groupPendingMembers: action.payload }
    case types.GET_GROUP_EVENT_POLL_VOTES:
      return { ...state, groupEventPollVotes: action.payload }
    case types.GET_GROUP_MEMBERS:
      return { ...state, groupMembers: action.payload }
    case types.GET_GROUP:
      return { ...state, groupData: action.payload }
    case types.GET_GROUP_INFO:
      return { ...state, groupInfo: action.payload }
    case types.GET_GROUP_EVENT_POLL:
      return { ...state, groupEventPoll: action.payload }
    case types.GET_GROUP_SUGGESTIONS:
      return { ...state, groupSuggestions: action.payload }
    case types.GET_GROUP_CHATS:
      return { ...state, groupChats: action.payload }
    case types.GET_GROUP_CHATS_MESSAGES:
      return { ...state, groupChatCurrent: action.payload }
    case types.SET_GROUP_CHATS_MESSAGES:
      return { ...state, groupChatCurrent: action.payload }
    case types.GET_GROUP_SIGNATURES:
      return { ...state, groupSubscriptions: action.payload }
    case types.GET_GROUP_SUBSCRIPTION:
      return { ...state, groupSubscription: action.payload }
    case types.SET_NEW_GROUP:
      return { ...state, newGroup: action.payload }
    case types.SELECT_CHAT:
      return {...state, selectedChat: action.payload}
    default:
      return state
  }
}
