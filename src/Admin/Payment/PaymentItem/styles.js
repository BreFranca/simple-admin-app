import styled from "styled-components"

export const Row = styled.div`
  .row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #F0F0F7;
    margin-bottom: 5px;
    height: 50px;
    .colw {
      flex: 1;
      display: flex;
      align-items: center;
      &.not-found {
        margin: 0;
        width: 100%;
        text-align: center;
        justify-content: center;
        max-width: 100%;
        &:last-child {
          max-width: 100%;
          margin: 0;
          width: 100%;
        }
      }
      &:last-child {
        max-width: calc(17px + 50px);
        margin-left: 85px;
      }
    }
    .status {
      font-weight: 700;
      text-transform: uppercase;
      text-align: center;
      span {
        color: #B40F0F;
      }
      &.paid {
        span {
          color: #2E9110;
        }
      }
      &.waiting_payment {
        span {
          color: #A59B22;
        }
      }
      &.refunded {
        span {
          color: #A59B22;
        }
      }
    }
    .col {
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
        max-width: 200px;
      }
      &.payment {
        min-width: 164px;
      }
      &.payer {
        min-width: 240px;
        max-width: 240px;
      }
    }
    span {
      color: #92919D
    }
    button {
      appearance: none;
      box-shadow: none;
      background: transparent;
      border: none;
      transition: .5s all linear;
      cursor: pointer;
      &:hover {
        opacity: .8;
      }
    }
  }
`