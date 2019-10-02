import { orderMenu, hashValue, restApi, glyToken } from "../../_helpers"
import  moment  from "moment-timezone"
import { reset } from "redux-form"
import * as types from "../constants"
import { Variables } from '../../_helpers/variables'
export * from "./ui.actions"



// ### USUARIO LOGADO ###
export const getUserLogged = () => async dispatch => {
  await restApi
    .loadCustomers()
    .then(response =>
      dispatch({
        type: types.SET_USER,
        payload: response.data
      })
    )
    .catch(e => console.log("erro", e))
}

// #### USUÁRIO ESPECÍFICO ####
export const getCustomer = (idCustomer) => async dispatch => {
  const customer = await restApi.loadCustomer(idCustomer)
  return customer.data
}

// ### MENU LOGADO ###
export const loggedMenu = () => async dispatch => {
  await restApi
    .loadGroups()
    .then(response => {
      const { data } = response
      const groups = orderMenu(data)
      dispatch({
        type: types.AUTH_GROUPS,
        payload: groups
      })
    })
    .catch(e => console.log("erro", e))
}

export const getGroups = () => async dispatch => {
  const groups = await restApi.loadGroups()
  dispatch({
    type: types.AUTH_GROUPS,
    payload: groups.data
  })

  return groups.data
}

// ### LOGIN ###

export const signup = (formProps, callback) => async dispatch => {
  Variables.phone = formProps.phone
  const spreadProps = { ...formProps }
  spreadProps.phone = `+55${spreadProps.phone}`

  if (!!spreadProps.hashedPassword) {
    spreadProps.hashedPassword = spreadProps.hashedPassword.replace(
      spreadProps.hashedPassword,
      hashValue(spreadProps.hashedPassword)
    )
  }
  const today = new Date()
  const tomorrow = new Date()
  tomorrow.setDate(today.getDate()+1)
  localStorage.setItem("data-expire", tomorrow)
  // console.log(formProps.hashedPassword)
  localStorage.setItem("gly-aux-react", window.btoa(formProps.hashedPassword))

  if(formProps.loginRemember === true || formProps.loginRemember === "true") {
    //saving password on localstorage with a unsuspicious name
    localStorage.setItem("auth_remember", true)
    localStorage.setItem("gly-customer-phone", formProps.phone)
    dispatch({
      type: types.AUTH_REMEMBER,
      payload: true
    })
  } else {
    localStorage.setItem("auth_remember", false)
    localStorage.removeItem("gly-customer-phone", formProps.phone)
    // localStorage.removeItem("gly-aux-react", window.btoa(formProps.hashedPassword))
    dispatch({
      type: types.AUTH_REMEMBER,
      payload: false
    })
  }

  await restApi
    .postAuth(spreadProps)
    .then(response => {
      glyToken.setToken(response.data.token)
      dispatch({
        type: types.AUTH_USER,
        payload: response.data.token
      })
      callback()
    })
    .catch(e => {
      if (e.response.data.details === "Invalid password") {
        e.response.data.details = "Senha inválida"
      }
      dispatch({
        type: types.AUTH_ERR,
        payload: e.response.data.details
      })
    })
}

export const validateToken = (formProps, callback) => async dispatch => {
  try {
    restApi.loadValidationToken(
      localStorage.getItem("lpx-validation-id"),
      formProps.tokenValidation
    )

    callback()

    dispatch({
      type: types.AUTH_ERR,
      payload: "Usuário validado. Faça login para acessar a ferramenta!"
    })
  } catch (e) {
    dispatch({
      type: types.AUTH_ERR,
      payload: e.response.data.details
    })
  }
}

export const sendToken = (phone) => async dispatch => {
  try {
    restApi.postSendToken(phone)
  } catch (error) {
    console.log(error)
  }
}

export const validateTokenPassword = (phone, token) => async dispatch => {
  try {
    return await restApi.postValidateToken(phone, token)
  } catch (error) {
    console.log(error)
  }
}

export const postChangePassword = (phone, token, hashedPassword) => async dispatch => {
  if (!!hashedPassword) {
    hashedPassword = hashedPassword.replace(
      hashedPassword,
      hashValue(hashedPassword)
    )
  }
  try {
    return await restApi.postChangePassword(phone, token, hashedPassword)
  } catch (e) {
    console.log(e)
  }
}

// ### Registro ###

export const signin = (formProps) => async dispatch => {
  return new Promise((resolve, reject) => {
    const spreadProps = { ...formProps }
    spreadProps.phone = `+55${spreadProps.phone}`
    if (!!spreadProps.hashedPassword) {
      spreadProps.hashedPassword = spreadProps.hashedPassword.replace(
        spreadProps.hashedPassword,
        hashValue(spreadProps.hashedPassword)
      )
    }
    restApi.postNewCustomer(spreadProps).then((response) => {
      const tokenId = response.data._id
      localStorage.setItem("lpx-validation-id", tokenId)
      dispatch({
        type: types.AUTH_TOKEN,
        payload: response.data
      })
      resolve(response.data)
    }).catch((error) => {
      reject(error.response.data.error)
    })
  })
}

// export const signin = (formProps, callback) => async dispatch => {
//   const spreadProps = { ...formProps }
//   spreadProps.phone = `+55${spreadProps.phone}`
//   if (!!spreadProps.hashedPassword) {
//     spreadProps.hashedPassword = spreadProps.hashedPassword.replace(
//       spreadProps.hashedPassword,
//       hashValue(spreadProps.hashedPassword)
//     )
//   }

//   // restApi.postNewCustomer(spreadProps).then((result) => {
//   //   console.log('result', result)
//   // }).catch((e) => {
//   //   dispatch({
//   //     type: types.AUTH_ERR,
//   //     payload: e.response.data.error
//   //   })
//   // })

//   try {
//     const response = await restApi.postNewCustomer(spreadProps)

//     console.log('response', response)

//     const tokenId = response.data._id

//     localStorage.setItem("lpx-validation-id", tokenId)

//     dispatch({
//       type: types.AUTH_TOKEN,
//       payload: response.data
//     })

//     callback()
//   } catch (e) {
//     console.log('erro', e.response.data.error)
//     dispatch({
//       type: types.AUTH_ERR,
//       payload: e.response.data.error
//     })
//   }
// }

// ### Alterar senha ###

export const resetPassword = (formProps, callback) => async dispatch => {
  const spreadProps = { ...formProps }

  if (!!spreadProps.hashedPassword) {
    spreadProps.hashedPassword = spreadProps.hashedPassword.replace(
      spreadProps.hashedPassword,
      hashValue(spreadProps.hashedPassword)
    )
  }

  try {
    const response = await restApi.postCustomerEditPassword(spreadProps)

    const tokenId = response.data._id

    localStorage.setItem("lpx-validation-id", tokenId)

    dispatch({
      type: types.AUTH_TOKEN,
      payload: response.data
    })

    callback()
  } catch (e) {
    console.log(e)
  }
}
//  ### LOGOUT ###

export const signout = callback => {
  glyToken.deleteToken()

  callback()

  return {
    type: types.AUTH_USER,
    payload: ""
  }
}
// ## updateUser

export const updateRole = (props, password, callback) => async dispatch => {
  console.log(props)
  const spreadProps = { ...props }
  if (password !== '') {
    spreadProps.hashedPassword = password.replace(
      password,
      hashValue(password)
    )
  }
  const user = await restApi.putCustomer(props._id, spreadProps)

  dispatch({
    type: types.SET_USER,
    payload: user.data
  })

  callback()
}

// ## deleteUser
export const deleteCustomer = (customer) => async dispatch => {
  const user = await restApi.deleteCustomer(customer._id)
  .then(response => { return response })
  .catch(e => { return e.response})

  return user
}

/*
###########################
 D A S H B O A R D
###########################
*/

export const createNewGroup = (groupInfo, callback) => async dispatch => {
  let dataNewGroup = { ...groupInfo, status: "pending" }

  await restApi.postNewGroup(dataNewGroup)
    .then(response => {

      dataNewGroup = { ...dataNewGroup, groupInfo: response.data }
    
      dispatch({
        type: types.SET_NEW_GROUP,
        payload: dataNewGroup
      })
    
      restApi.loadGroups()
        .then(response => {
          const { data } = response
          const groups = orderMenu(data)
          dispatch({
            type: types.AUTH_GROUPS,
            payload: groups
          })
        })

    
      callback()
    })
}

export const loadGroup = groupId => async dispatch => {
  try {
    const response = await restApi.loadGroup(groupId)

    dispatch({
      type: types.GET_GROUP,
      payload: response.data
    })

    return response
  } catch (e) {
    console.log(e)
  }
}

export const getGroupInfo = groupId => async dispatch => {
  const groupInfo = await restApi.loadGroup(groupId)
  
  dispatch({
    type: types.GET_GROUP_INFO,
    payload: groupInfo
  })

  return groupInfo
}

export const deleteGroup = (groupId, callback) => async dispatch => {
  const group = await restApi.deleteGroup(groupId)
    .then(response => {return response})
    .catch(e => {return e.response})

  await restApi.loadGroups()
  .then(response => {
    const { data } = response
    const groups = orderMenu(data)
  
    dispatch({
      type: types.AUTH_GROUPS,
      payload: groups
    })
  })

  return group
}

export const loadPendingMembers = groupId => async dispatch => {
  const pendingMembers = await restApi.loadPendingMembers(groupId)

  dispatch({
    type: types.GET_GROUP_PENDING_MEMBERS,
    payload: pendingMembers.data
  })
}
export const manageUser = (formProps, groupId, callback) => async dispatch => {
  return new Promise(async (resolve, reject) => {
    const act = formProps.act
    const props = { id: formProps.id, role: formProps.role }
    try {
      if (act === "approve") {
        await restApi.putApproveCustomer(groupId, props)
      } else if (act === "manage") {
        await restApi.putManageCustomer(props.id, groupId, props)
      }
  
      dispatch(loadPendingMembers(groupId))
      dispatch(loadGroup(groupId))
      callback()
      resolve()
    } catch (e) {
      reject(e.response.data.details.error)
    }
  })
}

export const removeUser = (groupId, customerId, act) => async dispatch => {
  try {
    let user
    if (act === "pending") {
      user = await restApi.deletePendingMember(groupId, customerId)
      .then(response => {
        return response
      })
      .catch(e => {
        return e.response
      })
    } else if (act === "delete") {
      user = await restApi.deleteMember(groupId, customerId)
      .then(response => {
        return response
      })
      .catch(e => {
        return e.response
      })
    }
    dispatch(loadPendingMembers(groupId))
    dispatch(loadGroup(groupId))
    return user
  } catch (e) {
    return e
  }
}

/*
###########################
 E V E N T O S
###########################
*/

export const newEvent = (
  eventData,
  userData,
  groupId,
  eventId,
  callback,
  status
) => async dispatch => {
  const createdBy = userData._id
  const spreadData = { createdBy, ...eventData }

  if (spreadData.hasOwnProperty("startDate")) {
    //spreadData.startDate === null ? delete spreadData.startDate : spreadData.startDate  = spreadData.startDate.toISOString()
  }
  // if (spreadData.hasOwnProperty('endDate')) {
  //   spreadData.endDate === null   ? delete spreadData.endDate   : spreadData.endDate    = spreadData.endDate.toISOString()
  // }
  spreadData.startDate = spreadData.startDate ? spreadData.startDate.toString() : null
  spreadData.endDate = spreadData.endDate ? spreadData.endDate.toString() : null
  eventId === undefined
    ? await restApi.postNewEvent(groupId, spreadData)
    : await restApi.putEditEvent(groupId, eventId, spreadData)

  const groupEvents = await restApi.loadGroupEvents(groupId)

  dispatch({
    type: types.SET_GROUP_EVENTS,
    payload: groupEvents.data
  })

  callback()
}
// carregar todos os eventos
export const loadEvents = groupId => async dispatch => {
  try {
    const response = await restApi.loadGroupEvents(groupId)
    const momentData = [...response.data]

    momentData.map(data => (data.start = moment(data.created).format("LLL")))

    dispatch({
      type: types.GET_GROUP_EVENTS,
      payload: momentData
    })
  } catch (e) {
    console.log(e)
  }
}
//carregar 1 event
export const loadEvent = (groupId, eventId) => async dispatch => {
  try {
    const response = await restApi.loadGroupEvent(groupId, eventId)

    dispatch({
      type: types.GET_GROUP_EVENT,
      payload: response.data
    })
  } catch (e) {
    console.log(e)
  }
}

export const deleteEvent = (groupId, eventId) => async dispatch => {
  try {
    await restApi.deleteEvent(groupId, eventId)
    dispatch(loadEvents(groupId))
  } catch (e) {
    console.log(e)
  }
}

export const confirmEvent = (groupId, eventId) => async dispatch => {
  const status = { status: "confirmed" }
  await restApi.putConfirmEvent(groupId, eventId, status)

  dispatch(loadEvents(groupId))
}

export const loadEventPoll = (groupId, eventId, pollId) => async dispatch => {
  try {
    const response = await restApi.loadGroupEventPoll(groupId, eventId, pollId)

    dispatch({
      type: types.GET_GROUP_EVENT_POLL,
      payload: response.data
    })
  } catch (e) {
    console.log(e)
  }
}

export const manageEventPoll = (
  formProps,
  groupId,
  eventId,
  pollId,
  callback
) => async dispatch => {
  const propsPoll = { groupId, eventId, pollId, ...formProps }

  const response =
    pollId === undefined
      ? await restApi.postNewPoll(groupId, eventId, propsPoll)
      : await restApi.putEditPoll(groupId, eventId, pollId, propsPoll)
  dispatch({
    type: types.CREATE_GROUP_EVENTS_POLL,
    payload: response.data
  })

  callback()
}

export const loadEventPollVotes = (
  groupId,
  eventId,
  pollId
) => async dispatch => {
  try {
    const response = await restApi.loadGroupEventPollVotes(
      groupId,
      eventId,
      pollId
    )
    console.log("resultados eventos", response.data)
    dispatch({
      type: types.GET_GROUP_EVENT_POLL_VOTES,
      payload: response.data
    })
  } catch (e) {
    console.log(e.response.data)
  }
}

export const deleteEventPoll = (groupId, eventId, pollId) => async dispatch => {
  await restApi.deleteEventPoll(groupId, eventId, pollId)

  dispatch(loadEvents(groupId))
}

export const loadGroupEventPollVotesReport = (groupId, eventId, pollId) => async dispatch => {
  await restApi.loadGroupEventPollVotesReport(groupId, eventId, pollId)
  dispatch(loadEvents(groupId))
}

// Chat

export const getGroupChats = (groupId, groupInfo, userLoggedId) => async dispatch => {
  await restApi.loadGroupChats(groupId).then(response => {
      let temp = response.data
      for (let group of temp) {
        if (group.subject === undefined) {
          group.subject = ''
        }
        if (group.category === 'general') {
          group.subject = 'Chat Geral'
        } else if (group.category === 'subgroup') {
          for (let index = 0; index < group.members.length; index ++) {
            let element = group.members[index]
            group.subject += ` ${element.name}`
            if (index !== group.members.length - 1) {
              group.subject += ','
            }
          }
        } else if (group.category === 'employee') {
          group.subject = getSubjectForEmployeeChat(groupInfo, temp, userLoggedId)
        } else if (group.category === 'personal') {
          group.subject = getSubjectForPersonalChat(group, userLoggedId)
        }
      }
      dispatch({
        type: types.GET_GROUP_CHATS,
        payload: temp
      })
    }
  )
}

function getSubjectForEmployeeChat(group, chat, userLoggedId) {
  let subject = ''
  let role = getUserRole(group, userLoggedId)

  if (role === 'admin') {
    for (let member of group.membersGroupInfo) {
      if (getUserRole(group, member.id) !== 'admin') {
        subject += member.name
      }
    }
  } else {
    for (let index = 0; index < group.membersGroupInfo.length; index++) {
      const element = group.membersGroupInfo[index]
      if (getUserRole(group, element.id) !== 'admin') {
        subject += ` ${element.name}`
        if (index !== group.membersGroupInfo.length - 1) {
          subject += ','
        }
      }
    }
  }
  return subject
}

function getUserRole(group, userLoggedId) {
  for (let member of group.membersGroupInfo) {
    if (member.id === userLoggedId) {
      return member.role
    }
  }
}

function getSubjectForPersonalChat(chat, userLogged) {
  for (let member of chat.members) {
    if (member._id !== userLogged) {
      return member.name
    }
  }
}

export const setGroupChat = (groupId, props) => async dispatch => {
  await restApi
    .postNewChatMember(groupId, props)
    .then(() => dispatch(getGroupChats(groupId)))
    .catch(e => console.log(e))
}

export const selectChat = (userLogged, chats, chatId, groupId) => async dispatch => {
  for (let chat of chats) {
    if (chat._id === chatId) {
      if (chat.chatDetail && chat.chatDetail[userLogged]) {
        chat.chatDetail[userLogged].messagesUnread = 0
        await restApi.updateChat(chatId, groupId, {chatDetail: chat.chatDetail})
      }
    }
  }
  
  dispatch({
    type: types.GET_GROUP_CHATS,
    payload: chats
  })
  dispatch({
    type: types.SELECT_CHAT,
    payload: { chatId, groupId }
  })
}

export const getChatLastMessages = (
  chats,
  chatId,
  groupId,
  sender,
  socket
) => async dispatch => {
  // socket.emit("lastMessages", { chatId })

  // socket.on("lastMessages", async response => {
  //   const messageDate = {
  //     chatId,
  //     groupId,
  //     messages: [...response.messages]
  //   }
  //   await restApi.updateChat(chatId, groupId, {chatDetail: {[sender]: {messagesUnread: 0}}})
  //   dispatch({
  //     type: types.GET_GROUP_CHATS_MESSAGES,
  //     payload: messageDate
  //   })
  // })
  dispatch({
    type: types.GET_GROUP_CHATS_MESSAGES,
    payload: { chatId, groupId }
  })
}

export const sendChatNewMessage = (
  chatId,
  groupId,
  sender,
  msg,
  socket
) => async dispatch => {
  console.log("msg", msg)
  socket.emit("message", { chatId, groupId, sender, content: msg.content })

  dispatch(getChatLastMessages(chatId, groupId, sender, socket)).then(
    dispatch(reset("newMessageChat"))
  )
}

export const newSocketChatMessage = (data, chats, currentChat, userLogged) => async dispatch => {
  for (let chat of chats) {
    if (chat._id === data.chatId) {
      chat.messages.unshift(data)
      if(currentChat !== null && chat._id === currentChat.chatId) {
        if (chat.chatDetail[userLogged]) {
          chat.chatDetail[userLogged].messagesUnread = 0
        } else {
          chat.chatDetail[userLogged] = {
            messagesUnread: 0
          }
        }
      } else {
        chat.chatDetail[userLogged].messagesUnread += 1
      }
      restApi.updateChat(currentChat.chatId, currentChat.groupId, {chatDetail: chat.chatDetail})
    }
  }

  dispatch({
    type: types.GET_GROUP_CHATS,
    payload: chats
  })
  // newChatMessage.messages.unshift(data)

  // dispatch({
  //   type: types.SET_GROUP_CHATS_MESSAGES,
  //   payload: newChatMessage
  // })
  // dispatch(reset("newMessageChat"))
}
export const closeChatMessage = () => async dispatch => {
  dispatch({
    type: types.SET_GROUP_CHATS_MESSAGES,
    payload: []
  })
}

// sugestoes

export const loadGroupSuggestions = groupId => async dispatch => {
  const response = await restApi.loadGroupSuggestions(groupId)
  const sortedSuggestions = response.data.sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt)
  )
  dispatch({
    type: types.GET_GROUP_SUGGESTIONS,
    payload: sortedSuggestions
  })
}

export const setGroupSuggestionStatus = (
  groupId,
  suggestionId,
  props
) => async dispatch => {
  await restApi.putGroupSuggestions(groupId, suggestionId, { status: props })

  dispatch(loadGroupSuggestions(groupId))
}

// Payments
export const getPlans = () => async dispatch => {
  const plans = await restApi
    .loadPlans()
    .then(response => {
      dispatch({
        type: types.GET_PLANS,
        payload: response.data
      })
      return response.data
    })
    .catch(e => console.log("erro", e))

    return plans
}

export const createNewGroupWithPlan = nameGroup => async dispatch => {
  const dataNewGroup = { ...nameGroup }

  let newGroupId;
  await restApi
    .postNewGroup(dataNewGroup)
    .then(response => {
        newGroupId = response.data._id
      }
    )

  const group = await restApi.loadGroup(newGroupId)

  dispatch({
    type: types.GET_GROUP,
    payload: group.data
  })
  
  await restApi.loadGroups()
  .then(response => {
    const { data } = response
    const groups = orderMenu(data)
    dispatch({
      type: types.AUTH_GROUPS,
      payload: groups
    })
  })

  return group.data
}

export const setNewPlan = (dataPlan, callback) => async dispatch => {
  const dataNewPlan = { ...dataPlan }

  dispatch({
    type: types.SET_NEW_PLAN,
    payload: dataNewPlan
  })

  callback()
}

export const loadgroupSubscriptions = (props) => async dispatch => {

  let signatures = {}

  await restApi
    .loadGroupSubscriptions(props)
    .then(response => {
        const { data } = response
        if(data.signatures.length > 0) {
          signatures = {...extract, idSubscription: data.signatures[0].id}

          dispatch({
            type: types.GET_GROUP_SUBSCRIPTION,
            payload: data.signatures[0]
          })
  
          return signatures
          
        }

      }
    )
    .catch(e => console.log("erro", e))

    let extract
    if(signatures.idSubscription) {
      extract = await restApi
        .loadSubscription(signatures.idSubscription)
        .then(response => {
            dispatch({
              type: types.GET_GROUP_SIGNATURES,
              payload: response.data.customer
            })
            return response.data
          }
        )
        .catch(e => console.log("erro", e))
    } else {
      dispatch({
        type: types.GET_GROUP_SIGNATURES,
        payload: []
      })
    }

    extract = {
      ...extract,
      extract: extract
    }

    return extract
}

export const loadLastSubscription = (props) => async dispatch => {
  
  const signatures = await restApi
    .loadGroupSubscriptions(props)
    .then(response => {
        dispatch({
          type: types.LAST_SIGNATURE,
          payload: response.data.signatures[0]
        })

        return response.data.signatures[0]
      }
    )
    .catch(e => console.log("erro", e))

  return signatures
}

export const updatePaymentMethod = (props, callback) => async dispatch => {
  const signature = await restApi
    .putSubscription(props.idSubscription, props)
    .then(response => {
        if (response.data.signature.newSubscription.payment_method === 'boleto') {
          window.open(response.data.signature.newSubscription.current_transaction.boleto_url)
        }
        // dispatch({
        //   type: types.LAST_SIGNATURE,
        //   payload: response.data.signatures[0]
        // })

        return response
      }
    )
    .catch(e => console.log("erro", e))

  callback()

  return signature
}

export const paymentNewPlan = (props, callback) => async dispatch => {
  const dataNewPlan = { ...props, status: "pending" }
  let success
  let subscription
  if(dataNewPlan.idSubscription) {
    subscription = await restApi.putSubscription(dataNewPlan.idSubscription, props)
    .then(response => {
      if (response.data.signature.newSubscription.payment_method === 'boleto') {
        window.open(response.data.signature.newSubscription.current_transaction.boleto_url)
      }
      return response
    })
    .catch(e => {
      return e.response
    })
  } else {
    subscription = await restApi.postNewPlan(props)
    .then(response => {
      success = response.data
      if (response.data.signature.newSubscription.payment_method === 'boleto') {
        window.open(response.data.signature.newSubscription.current_transaction.boleto_url)
      }
      dispatch(restApi.loadGroups())

      return success
    })
    .catch(e => {
      return e.response
    })
  }

  await restApi.loadGroups()
    .then(response => {
      const { data } = response
      const groups = orderMenu(data)
      dispatch({
        type: types.AUTH_GROUPS,
        payload: groups
      })
    })

  return subscription
}

export const cancelSubscription = (props) => async dispatch => {
  const subscription = await restApi.postCancelSubscription(props)

  return subscription
}

export const getCustomerSubscription = (customerId) => async dispatch => {

  await restApi.loadCustomerSubscriptions(customerId)
  .then(response => {
    dispatch({
      type: types.GET_CUSTOMER_SUBSCRIPTIONS,
      payload: response.data.customer
    })
  })

  await restApi.loadCustomerTransactions(customerId)
  .then(response => {
    dispatch({
      type: types.GET_CUSTOMER_TRANSACTIONS,
      payload: response.data.customer
    })
  })
}

export const transferGroup = (groupId, customerId) => async dispatch => {
  return new Promise((resolve, reject) => {
    restApi.transferGroup(groupId, customerId).then((result) => {
      dispatch({
        type: types.GET_GROUP,
        payload: result.data,
      })
      resolve(result)
    }).catch((error) => {
      reject(error.response.data.details.message)
    })
  })
}