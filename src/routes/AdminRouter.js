import React from "react"
import requireAuth from "../components/requireAuth"
import { HashRouter, Switch, Route } from "react-router-dom"

import Homepage from "../Admin/Homepage"
import GroupDashboard from "../screens/GroupDashboard"
import GroupEvents from "../screens/GroupEvents"
import GroupMessages from "../screens/GroupMessages"
import GroupSuggestion from "../screens/GroupSuggestion"
import EventsAdd from "../Admin/Events/EventsAdd"
import EventsPollNew from "../Admin/Events/EventsPollNew"
import EventsPollVotes from "../Admin/Events/EventsPollVotes"
import EventReport from "../Admin/Events/EventReport"
import GroupsCreate from "../Admin/Groups/GroupsCreate"
import GroupsPaymentMethod from "../Admin/Groups/GroupsPaymentMethod"

import GroupPayments from "../screens/GroupPayments"
import PaymentUpgrade from "../Admin/Payment/PaymentUpgrade"
import PaymentModify from "../Admin/Payment/PaymentModify"
import PaymentChooseMethod from "../Admin/Payment/PaymentChooseMethod"

import Payments from "../Admin/Payments"
import UserSettings from "../Admin/UserSettings"

const AdminRouter = () => {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/admin/" component={Homepage} />
        <Route exact path="/admin/groups/:idGroup/dashboard" component={GroupDashboard} />
        <Route
          exact
          path="/admin/groups/:idGroup/events/"
          render={props => <GroupEvents {...props} />}
        />
        <Route exact path="/admin/groups/:idGroup/events/add" component={EventsAdd} />
        <Route
          exact
          path="/admin/groups/:idGroup/events/:idEvent/editevent"
          component={EventsAdd}
        />
        <Route
          exact
          path="/admin/groups/:idGroup/events/:idEvent/report"
          component={EventReport}
        />
        <Route
          exact
          path="/admin/groups/:idGroup/events/:idEvent/newpoll"
          component={EventsPollNew}
        />
        <Route
          exact
          path="/admin/groups/:idGroup/events/:idEvent/editpoll/:idPoll/poll"
          component={EventsPollNew}
        />
        <Route
          exact
          path="/admin/groups/:idGroup/events/:idEvent/poll/:idPoll/showpoll"
          component={EventsPollVotes}
        />
        <Route exact path="/admin/groups/create" component={GroupsCreate} />
        <Route exact path="/admin/groups/create/method" component={GroupsPaymentMethod} />
        <Route path="/admin/messages/:idGroup" component={GroupMessages} />
        <Route exact path="/admin/payments/" component={Payments} />
        <Route exact path="/admin/payments/:idGroup" component={GroupPayments} />
        <Route exact path="/admin/payments/:idGroup/upgrade" component={PaymentUpgrade} />
        <Route exact path="/admin/payments/:idGroup/modify" component={PaymentModify} />
        <Route exact path="/admin/payments/:idGroup/choose" component={PaymentChooseMethod} />
        <Route
          path="/admin/suggestion/:idGroup/:typeSuggestion/:idSuggestion?"
          component={GroupSuggestion}
        />
        <Route path="/admin/usersettings/" component={UserSettings} />
      </Switch>
    </HashRouter>
  )
}

export default requireAuth(AdminRouter)
