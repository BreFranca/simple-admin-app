import React from "react"

import { HashRouter, Route, Switch } from "react-router-dom"

import Login from "../components/pages/Login"
import Register from "../components/pages/Register"
import Reset from "../components/pages/Reset"
import Logout from "../components/pages/Logout"
import Validate from "../components/pages/Validate"
import ValidatePassword from "../components/pages/ValidatePassword"
import Terms from "../components/pages/Terms"
import Privacy from "../components/pages/Privacy"
import EventPdf from "../Admin/Events/EventPdf"

import HomeForm from "../components/templates/HomeForm"
import HomeContent from "../components/templates/HomeContent"

import Admin from "../components/templates/Admin"

const HomeRouter = () => (
  <HashRouter>
    <Switch>
      <Route path="/event-pdf" exact component={EventPdf} />
      <HomeContent exact path="/termos" component={Terms} />
      <HomeContent exact path="/privacidade" component={Privacy} />
      <HomeForm exact path="/registro" component={Register} />
      <HomeForm exact path="/esquecisenha" component={Reset} />
      <HomeForm exact path="/validacaosenha" component={ValidatePassword} />
      <HomeForm exact path="/login" component={Login} />
      <HomeForm exact path="/logout" component={Logout} />
      <HomeForm exact path="/validacao" component={Validate} />

      <Route path="/admin" component={Admin} />
    </Switch>
  </HashRouter>
)

export default HomeRouter
