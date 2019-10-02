import React from "react"
import { Route } from "react-router-dom"

import { Content } from "../../organisms/Content"
import { PageContainer } from "../../organisms/PageContainer"
import Footer from "../../organisms/Footer"
import { ContentHeader as Header } from "../../organisms/Header"

const getLogged = () => {
  if(localStorage.getItem('gly-token-auth')) {
    return true
  } else {
    return false
  }
}

const HomeContent = ({ component: Component, ...props }) => (
  <Route
    {...props}
    render={matchProps => (
      <div className="main-wrapper">
        <PageContainer>
          <Header logged={getLogged()} />
          <Content>
            <Component {...matchProps} />
          </Content>
          <Footer />
        </PageContainer>
      </div>
    )}
  />
)

export default HomeContent
