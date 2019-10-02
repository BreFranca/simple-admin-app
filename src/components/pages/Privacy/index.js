import React from "react"
import ReactHtmlParser from "react-html-parser"

class Privacy extends React.Component {
  constructor() {
    super()
    this.state = {
      iubenda: ""
    }
  }
  componentDidMount = () => {
    fetch("https://www.iubenda.com/api/privacy-policy/18329888/only-legal")
      .then(response => response.json())
      .then(response => this.setState({ iubenda: response.content }))
    //.then(response => console.log(response.content))
  }
  render() {
    return <div className="content">{ReactHtmlParser(this.state.iubenda)}</div>
  }
}

export default Privacy
