import styled from "styled-components"

export const Form = styled.form`
  border: none;
  justify-content: center;
  padding: 30px;
  width: 100%;

  input:not([type="checkbox"]) {
    border: none;
    border-bottom: 1px solid #ccc;
    font-size: 1.1em;
    padding: 0 15px;
    display: block;
    height: 40px;
    margin: 20px 0;
    width: 100%;
  }
`
