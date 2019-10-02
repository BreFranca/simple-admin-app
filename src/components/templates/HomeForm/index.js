import React from "react"
import { Route } from "react-router-dom"

import Footer from "../../organisms/Footer"
import { PageContainer } from "../../organisms/PageContainer"
import { FormHeader as Header } from "../../organisms/Header"
import { DisplayImage } from "../../atoms/DisplayImage"
import { FormContainer } from "../../organisms/FormContainer"

const HomeForm = ({ component: Component, ...props }) => (
  <Route
    {...props}
    render={matchProps => (
      <div className="main-wrapper">
        <PageContainer>
          <FormContainer>
            <DisplayImage />
            <div>
              <Header />
              <Component {...matchProps} />
            </div>
          </FormContainer>
          <Footer />
        </PageContainer>
      </div>
    )}
  />
)

export default HomeForm
