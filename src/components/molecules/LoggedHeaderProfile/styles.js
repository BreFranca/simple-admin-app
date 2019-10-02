import styled from "styled-components"

export const Container = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin-left: 30px;
`

export const Toggle = styled.input`
  display: none;
`

export const Mask = styled.button`
  box-shadow: none;
  border: none;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, .4);
  display: none;
  ${Toggle}:checked ~ & {
    display: block;
  }
`

export const HeaderProfile = styled.div`
  display: none;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  background: #fff;
  left: auto;
  right: 0;
  top: 100%;
  position: absolute;
  min-width: 260px;
  border: 1px solid #CCCCCC;
  margin-top: -1px;
  padding-top: 10px;
  z-index: 10;
  ${Toggle}:checked ~ & {
    display: block;
  }
  & a {
    padding: 8px 25px;
    display: block;
    color: #262121;
    text-decoration: none;
    &.sign-out {
      color: #9D9D9D;
      padding-top: 11px;
      padding-bottom: 11px;
    }
  }
`

export const HeaderName = styled.label`
  border-left: 1px solid #CCCCCC;
  padding: 12px 30px;
  display: block;
  font-size: 15px;
  display: flex;
  align-items: center;
  background: #FFFFFF;
  z-index: 2;
  ${Toggle}:checked ~ & {
    border: 1px solid #CCCCCC;
    border-bottom: none;
    box-shadow: -3px -5px 6px rgba(0, 0, 0, .16);
    position: relative;
    z-index: 11;
    height: 50px;
  }
  .image {
    display: block;
    width: 30px;
    height: 30px;
    background: #CAC8D5;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 10px;
  }
`

export const Divider = styled.div`
  background: #CCCCCC;
  height: 1px;
  display: block;
  margin-top: 5px;
`