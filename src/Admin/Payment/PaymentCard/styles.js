import styled from "styled-components"

const Card = styled.div`
  background: #FFFFFF;
  // margin-top: 40px;
  & + div {
    margin-top: 40px;
  }
  .card-content {
    padding: 0 20px 23px;
  }
  .header {
    margin-bottom: 20px;
  }
`
export default Card