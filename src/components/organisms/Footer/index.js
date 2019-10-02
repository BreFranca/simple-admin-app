import React from "react"
import { Link } from "react-router-dom"

const Footer = () => (
  <div className="footer-wrapper">
    <Link to="/privacidade">Politica de privacidade</Link>{" "}
    <Link to="/termos">Termos de uso</Link>
  </div>
)

export default Footer
