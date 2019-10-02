import styled from "styled-components"
import { Link } from "react-router-dom"

export const LinkButton = styled(Link)`
  border-radius: 3px;
  background: #43425b;
  display: inline-block;
  color: #fff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  cursor: pointer;
  font-weight: bold;
  text-decoration: none;
  padding: 10px 15px;
  transition: .4s all linear;
  & + button,
  & + a {
    margin-left: 20px;
  }
  &:hover {
    background: rgba(0, 0, 0, .7)
  }
`
export const LinkBtn = styled.div`
  border-radius: 3px;
  background: #43425b;
  display: inline-block;
  color: #fff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  cursor: pointer;
  font-weight: bold;
  text-decoration: none;
  padding: 10px 15px;
  transition: .4s all linear;
  & + button,
  & + a {
    margin-left: 20px;
  }
  &:hover {
    background: rgba(0, 0, 0, .7)
  }
`