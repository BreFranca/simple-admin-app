import styled from "styled-components"

export const Menu = styled.div`
  background: #43425b;
  box-sizing: border-box;
  top: 0;
  bottom: 0;
  position: fixed;
  width: 260px;
  display: flex;
  flex-direction: column;
`

export const Nav = styled.nav`
  flex: 1;
  width: 100%;
  overflow-y: scroll
`

export const Toggle = styled.input`
  display: none;
`

export const LabelMenu = styled.label`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  cursor: pointer;
  display: block;
  padding: 10px 35px 10px 13px;
  transition: ease-in 100ms;
  position: relative;
  font-size: 14px;
  font-weight: 700;
  &:after {
    content: '';
    width: 0; 
    height: 0; 
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    
    border-left: 5px solid #FFFFFF;
    position: absolute;
    top: 50%;
    right: 22px;
    transform: translateY(-50%);
  }
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  ${Toggle}:checked ~ & {
    background: #565373;
    &::after {
      border-bottom: none;
      border-right: 5px solid transparent;
      border-left: 5px solid transparent;
      border-top: 5px solid #FFFFFF;
    }
  }
`

export const SubMenu = styled.ul`
  display: none;
  background: #565373;
  ${Toggle}:checked ~ & {
    display: block;
    border-bottom: 1px solid #43425b;
  }
  & a {
    color: rgba(225, 225, 225, 0.95);
    text-decoration: none;
  }
`

export const SubMenuItem = styled.li`
  background: rgba(0, 0, 0, 0.3);
  // border-top: 1px solid rgba(225, 225, 225, 0.2);
  list-style: none;
  transition: ease-in 300ms;
  background: #565373;
  font-size: 14px;
  span {
    width: 18px;
  }
  & a {
    display: block;
    padding: 10px 13px;
  }
  &:hover {
    background: rgba(0, 0, 0, 0.6);
  }
`

export const MenuItem = styled.li`
  color: #f0f0f7;
  cursor: pointer;
  list-style: none;
  &.pending {
    cursor: auto;
    ${SubMenuItem}:not(.payment) {
      opacity: .2;
      cursor: auto;
      pointer-events: none;
    } 
  }
  &.frozen {
    cursor: auto;
    ${SubMenuItem}:not(.payment) {
      opacity: .2;
      cursor: auto;
      pointer-events: none;
    } 
  }
`

export const LinkMenu = styled.li`
  cursor: pointer;
  display: block;
  padding: 10px 13px;
  transition: ease-in 100ms;
  background: rgba(0, 0, 0, .3);
  border-top: none!important;
  margin-top: 15px;
  a {
    color: #f0f0f7;
    text-decoration: none;
  }
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`

export const PlansButton = styled.div`
  display: flex;
  align-items: center;
  transition: ease-in 100ms;
  border-top: none!important;
  font-size: 14px;
  font-weight: 700;
  background: #5FB416;
  height: 54px;
  max-height: 54px;
  a {
    color: #FFFFFF;
    padding: 10px 13px;
    text-decoration: none;
    span {
      margin-right: 11px;
      font-size: 15px;
    }
  }
  &:hover {
    background: #65BE18;
  }
`