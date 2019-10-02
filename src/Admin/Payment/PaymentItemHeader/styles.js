import styled from "styled-components"

const Header = styled.div`
  .header-item {
    display: flex;
    align-items: center;
    margin-bottom: 6px;
    .col {
      font-size: 12px;
      font-weight: 700;
      color: #92919D;
      padding: 0 17px;
      &.status {
        min-width: 115px;
        padding-left: 25px;
      }
      &.cod {
        min-width: 93px;
      }
      &.date {
        min-width: 175px;
      }
      &.plan {
        min-width: 200px;
        max-width: 200px
      }
      &.payment {
        min-width: 164px;
      }
      &.payer {
        min-width: 240px;
        max-width: 240px;
      }
    }
  }
`

export default Header