import styled from "styled-components"

export const StyledFormHeader = styled.header`
  display: flex;
  flex-direction: column;
  padding: 20px;
  text-align: center;
  div {
    margin: 30px;
    a {
      background: #43425b;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
      color: #fff;
      font-weight: bold;
      margin: 0 20px;
      padding: 10px 15px;
      text-decoration: none;
    }
  }
`

export const StyledContentHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  div a {
    background: #fff;
    color: #43425b;
    font-weight: bold;
    text-decoration: none;
    padding: 10px 15px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    margin-left: 15px;
  }
`
