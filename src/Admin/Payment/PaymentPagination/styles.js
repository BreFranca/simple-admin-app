import styled from "styled-components"

const Paginate = styled.div`
  background: #FFFFFF;
  padding: 0 20px 13px;
  ul {
    display: flex;
    align-items: center;
    justify-content: center;
    list-style: none;
    li {
      list-style: none;
      padding: 0 7px;
      button {
        background: transparent;
        border: none;
        box-shadow: none;
        cursor: pointer;
        font-size: 15px;
        transition: all .4s linear;
        color: #92919D;
        &:hover {
          color: #43415B;
          font-weight: bold;
        }
      }
      &.active {
        button {
          color: #43415B;
          font-weight: bold;
        }
      }
    }
  }
`
export default Paginate