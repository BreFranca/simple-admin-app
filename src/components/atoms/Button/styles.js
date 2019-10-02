import styled from "styled-components"

export const Button = styled.button`
  background: #43425b;
  border: none;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  color: #fff;
  font: bold 16px "Fira Sans", sans-serif;
  padding: 10px 15px;
  transition: .4s all linear;
  & + a,
  & + button {
    margin-left: 20px;
  }
  &.underline {
    background: transparent;
    padding: 0;
    color: #000000;
    font-size: 12px;
    margin-top: 10px;
    font-weight: 400;
    text-decoration: underline;
    box-shadow: none;
    &:hover {
      background: transparent;
      color: #43425b;
    }
  }
  &:disabled {
    opacity: .65;
    cursor: no-drop;
    &:hover {
      background: #43425b;
    }
  }
  &:hover {
    background: rgba(0, 0, 0, .7)
  }
`

export const ChatButton = styled.button`
  height: 40px;
  align-items: center;
  #background: #43425b;
  border: none;
  #box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  display: flex !important;
  cursor: pointer;
  color: black;
  font: 16px "Fira Sans", sans-serif;
  padding: 8px;
  transition: .4s all linear;
  & + a,
  & + button {
    margin-left: 20px;
  }
  &.underline {
    background: transparent;
    padding: 0;
    color: #000000;
    font-size: 12px;
    margin-top: 10px;
    font-weight: 400;
    text-decoration: underline;
    box-shadow: none;
    &:hover {
      background: transparent;
      color: #43425b;
    }
  }
  &:disabled {
    opacity: .65;
    cursor: no-drop;
    &:hover {
      background: #43425b;
    }
  }
  &:hover {
    background: #cdcde4;
  }
  &:last-child {
    margin-bottom: 8px;
  }
`