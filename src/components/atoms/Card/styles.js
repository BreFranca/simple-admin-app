import styled from "styled-components"

export const Container = styled.div`
  background: #FFFFFF;
  // margin-top: 40px;
  box-shadow: 10px 10px 10px rgba(0,0,0,0.1);
  .card-content {
    padding: 0 20px 23px;
  }
  .header {
    margin-bottom: 20px;
  }
`
export const CustomHeader = styled.div`
  padding: 20px 0 13px;
  h3 {
    font-size: 24px;
    font-weight: 400;
    color: #262121;
    span: {
      font-size: 17px;
      margin-left: 10px;
    }
  }
`

export const Header = styled.div`
  background: #FFFFFF;
  padding: 20px 0 13px;
  border-bottom: 1px solid #C3C2CE;
  h3 {
    font-size: 24px;
    font-weight: 400;
    display: flex;
    align-items: center;
    color: #262121;
    span {
      font-size: 17px;
      margin-left: 10px;
    }
  }
`