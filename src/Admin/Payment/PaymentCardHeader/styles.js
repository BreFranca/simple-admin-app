import styled from "styled-components"

const Header = styled.div`
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
  .top {
    display: grid;
    grid-template-columns: auto auto;
  }
  .bottom {
    display: flex;
    align-items: center;
    margin-top: 7px;
    h4 {
      color: #92919D;
      span {
        font-weight: 400;
      }
    }
  }
  .type {
    margin-right: 70px;
  }
  .buttons-container {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
`
export default Header