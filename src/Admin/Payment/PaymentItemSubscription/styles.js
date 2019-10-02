import styled from "styled-components"

export const Row = styled.div`
  .col {
    padding: 0 17px;
    &.type {
      min-width: 200px;
      padding-left: 25px;
      span {
        span {
          margin-right: 10px;
        }
      }
    }
    &.finish {
      min-width: 115px;
    }
    &.valid {
      min-width: 93px;
    }
    &.delete {
      button {
        font-size: 18px;
        transition: .4s all linear;
        &:hover {
          color: #B40F0F;
        }
      }
    }
  }
  .header-item {
    display: flex;
    align-items: center;
    margin-bottom: 6px;
    .col {
      font-size: 12px;
      font-weight: 700;
      color: #92919D;
    }
  }
  .row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #F0F0F7;
    margin-bottom: 5px;
    height: 48px;
    .colw {
      flex: 1;
      display: flex;
      align-items: center;
      // &:last-child {
      //   max-width: calc(17px + 50px);
      //   margin-left: 85px;
      // }
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
    }
    &:last-child {
      margin-bottom: 0;
    }
    .status {
      font-weight: 700;
      text-transform: uppercase;
      span {
        &.pago {
          color: #B40F0F;
        }
        .nao-pago {
          color: #2E9110;
        }
      }
    }
    span {
      color: #707070;
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