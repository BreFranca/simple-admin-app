import styled from 'styled-components'

export const Slice = styled.div`
  max-width: 650px;
  p {
    margin-bottom: 0;
    font-weight: 400;
    color: #707070;
  }
`

export const SliceContainer = styled.div`
  max-width: 479px;
  min-width: 432px;
  width: 432px;
`

export const Container = styled.div `
    display: flex;
    align-items: center;
    padding: 0 15px;
    .input-range__label {
      display: none;
    }
    .input-range__track--background {
      height: 10px;
    }
    .input-range__track {
      height: 10px;
    }
    .input-range__slider {
      width: 20px;
      height: 20px;
      margin-top: -15px;
      margin-left: -15px;
      background: #43415B;
      border-color: #43415B;
    }
    .input-range__track--active {
      background: #8682AF;
    }
    .tooltip {
      background: #43415B;
      min-width: 145px;
      padding: 7px 26px 8px;
      border-radius: 3px;
      position: relative;
      margin-left: 23px;
      &-lg {
        min-width: 165px;
      }
      &::before {
        content: "";
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 100%;
        width: 0; 
        height: 0; 
        border-top: 11px solid transparent;
        border-bottom: 11px solid transparent; 
        
        border-right: 11px solid #43415B; 
      }
      span, strong {
        color: #FFFFFF;
        display: block;
        text-align: center;
      }
      span {
        font-size: 15px;
      }
      strong {
        font-size: 17px;
      }
    }
`