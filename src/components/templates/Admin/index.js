import React, { Fragment } from "react"
import { connect } from "react-redux"
import requireAuth from "../../requireAuth"

import AdminHeader from "../../organisms/AdminHeader"
import VerticalMenu from "../../organisms/VerticalMenu"
import AdminFooter from "../../organisms/AdminFooter"
import AdminRouter from "../../../routes/AdminRouter"

class Admin extends React.Component {
  componentDidMount() {
    const today = new Date()
    const expire = new Date(localStorage.getItem('data-expire'))
    if(expire.getTime() <= today.getTime()) {
      localStorage.removeItem('gly-token-auth');
      localStorage.removeItem('auth_remember');
      localStorage.removeItem('gly-customer-phone');
      localStorage.removeItem('gly-aux-react');
      this.props.history.push("/login")
    }
  }

  componentDidUpdate() {
    // this.shouldNavigateAway()
  }

  componentWillUnmount() {
    if(!localStorage.getItem('auth_remember')) {
      localStorage.removeItem('gly-token-auth');
      localStorage.removeItem('auth_remember');
      localStorage.removeItem('gly-customer-phone');
      localStorage.removeItem('gly-aux-react');
    }
  }

  render() {
    return (
      <Fragment>
        <VerticalMenu />
        <main className="main">
          <AdminHeader />
          <div className="admin-content">
            <AdminRouter />
          </div>
          <AdminFooter />
        </main>
      </Fragment>
    )
  }
}

function mapStateToProps(state) {
  return { remember: state.auth.remember }
}

export default connect(mapStateToProps)(requireAuth(Admin))
