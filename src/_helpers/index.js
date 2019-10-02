import shajs from "sha.js"
import axios from "axios"
import { saveAs } from "file-saver"

export const hashValue = oldProp =>
  shajs("sha256")
    .update(oldProp)
    .digest("hex")
    .toUpperCase()

export const orderGroups = (groups) => {
  groups = groups.sort((a, b) => {
    const order = { pending: 1, active: 2, frozen: 3, deactivated: 4 };
    return (order[a.status] || 0) - (order[b.status] || 0);
  })
  return groups
}

export const orderMenu = (groups) => {
  groups = groups.sort((a, b) => {
    const order = { active: 1, pending: 2, frozen: 3, deactivated: 4 };
    return (order[a.status] || 0) - (order[b.status] || 0);
  })
  return groups
}

export const glyToken = {
  getToken: () => {
    try {
      const token = localStorage.getItem("gly-token-auth")
      if (token === null) {
        return undefined
      }
      return token
    } catch (e) {
      return undefined
    }
  },
  setToken: props => {
    localStorage.setItem("gly-token-auth", props)
    instance.defaults.headers["Authorization"] = glyToken.getToken()
  },
  deleteToken: () => {
    localStorage.removeItem("gly-token-auth")
    localStorage.removeItem('data-expire')
    if (localStorage.getItem('auth_remember') === 'false') {
      localStorage.removeItem('gly-customer-phone');
      localStorage.removeItem('gly-aux-react');
      localStorage.removeItem('auth_remember')
    }
  }
}

export const iubenda = axios.create({
  headers: {
    "content-type": "application/json"
  }
})

export const payment = axios.create({})

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    //    "Access-Control-Allow-Origin": "*",
    "content-type": "application/json",
    Authorization: glyToken.getToken()
  }
})

// instance.interceptors.request.use(config => {
//   //!config.headers.Authorization && glyToken.setToken();
//   console.log(
//     "interceptor token",
//     this,
//     localStorage.getItem("gly-token-auth")
//   );
//   // if (!config.headers.Authorization) {
//   //   config.headers.Authorization = glyToken.getToken();
//   // }
//   return config;
// });

// instance.interceptors.response.use(config => {
//   //   config.defaults.headers.commom["Authorization"] = config.data.token;

//   //   //console.log("interceptors.response", config.data.token);
//   config.headers.Authorization = config.data.token;
//   glyToken.setToken(config.data.token);
//   console.log(config);
//   console.log("resp", glyToken.getToken());
//   return config;
// });

export const restApi = {
  // get
  loadCustomers: () => instance.get("customers"),
  loadCustomer: idCustomer => instance.get(`customers/${idCustomer}`),
  loadValidationToken: (id, token) =>
    instance.get(`customers/verify/${id}/${token}`),
  loadGroup: groupId => instance.get(`groups/${groupId}/info`),
  loadGroups: () => instance.get("groups"),
  loadPendingMembers: groupId =>
    instance.get(`groups/${groupId}/members/requests`),
  loadGroupEvents: groupId => instance.get(`groups/${groupId}/events`),
  loadGroupEvent: (groupId, eventId) =>
    instance.get(`groups/${groupId}/events/${eventId}`),
  loadGroupEventPoll: (groupId, eventId, pollId) =>
    instance.get(`/groups/${groupId}/events/${eventId}/polls/${pollId}`),
  loadGroupEventPollVotes: (groupId, eventId, pollId) =>
    instance.get(`groups/${groupId}/events/${eventId}/polls/${pollId}/votes`),
  loadGroupEventPollVotesReport: async (groupId, eventId, pollId) => {
    const response = await instance.get(`groups/${groupId}/events/${eventId}/polls/${pollId}/report`, { responseType : 'blob' })

    const pdfBlob = new Blob([response.data], { type: 'application/pdf'});

    return saveAs(pdfBlob, 'report.pdf')
  },
  loadGroupSuggestions: groupId =>
    instance.get(`/groups/${groupId}/suggestions`),
  loadGroupChats: groupId => instance.get(`/groups/${groupId}/chats`),
  getChatById: (groupId, chatId) => instance.get(`/groups/${groupId}/chats/${chatId}`),
  updateChat: (chatId, groupId, update) => instance.put(`/groups/${groupId}/chats/${chatId}`, update),
  loadPlans: () => instance.get("plans"),
  loadGroupSubscriptions: groupId => instance.get(`signatures/groupId/${groupId}`),
  loadCustomerSubscriptions: customerId => instance.get(`signatures/customerId/${customerId}`),
  loadCustomerTransactions: customerId => instance.get(`/signatures/transactions/customer/${customerId}`),
  loadSubscription: signatureId => instance.get(`signatures/${signatureId}`),

  //post
  postNewCustomer: props => instance.post("customers", props),
  postCustomerEditPassword: props => instance.post("customers/reset", props),
  postNewGroup: props => instance.post("groups", props),
  postNewEvent: (groupId, props) =>
    instance.post(`groups/${groupId}/events/`, props),
  postNewPoll: (groupId, eventId, props) =>
    instance.post(`groups/${groupId}/events/${eventId}/polls`, props),
  postAuth: props =>
    instance.post("auth", props, {
      headers: {}
    }),
  postNewChatMember: (groupId, props) =>
    instance.post(`groups/${groupId}/chats`, props),
  postNewPlan: (props) =>
    instance.post(`signatures`, props),
  postCancelSubscription: (props) =>
    instance.post(`signatures/cancel`, props),
  postSendToken: (phone) =>
    instance.post('utils/createToken', {phone}),
  postValidateToken: async (phone, token) => {
    return await instance.post(`utils/verifyToken/${token}`, {phone})
  },
  postChangePassword: async (phone, token, hashedPassword) => {
    return await instance.post(`utils/changePassword/${token}`, {phone, hashedPassword})
  },

  //delete
  deleteCustomer: customerId => instance.post(`customers/${customerId}/delete`),
  deleteGroup: groupId => instance.delete(`groups/${groupId}`),
  deleteEvent: (groupId, eventId) =>
    instance.delete(`groups/${groupId}/events/${eventId}`),
  deleteEventPoll: (groupId, eventId, pollId) =>
    instance.delete(`groups/${groupId}/events/${eventId}/polls/${pollId}`),
  deleteMember: (groupId, customerId) =>
    instance.delete(`groups/${groupId}/members/${customerId}`),
  deletePendingMember: (groupId, customerId) =>
    instance.delete(`groups/${groupId}/members/requests/${customerId}`),

  //put
  putCustomer: (customerId, props) =>
    instance.put(`customers/${customerId}`, props),
  putApproveCustomer: (groupId, props) =>
    instance.put(`groups/${groupId}/members/requests/`, props),
  putManageCustomer: (customerId, groupId, props) =>
    instance.put(`groups/${groupId}/members/${customerId}`, props),
  putEditEvent: (groupId, eventId, props) =>
    instance.put(`groups/${groupId}/events/${eventId}/`, props),
  putConfirmEvent: (groupId, eventId, props) =>
    instance.put(`groups/${groupId}/events/${eventId}/`, props),
  putEditPoll: (groupId, eventId, pollId, props) =>
    instance.put(`groups/${groupId}/events/${eventId}/polls/${pollId}`, props),
  putGroupSuggestions: (groupId, suggestionId, props) =>
    instance.put(`/groups/${groupId}/suggestions/${suggestionId}`, props),
  putSubscription: (signatureId, props) =>
    instance.put(`/signatures/${signatureId}`, props),
  transferGroup: (groupId, customerId) => instance.post(`/groups/${groupId}/transfer/${customerId}`)
}
