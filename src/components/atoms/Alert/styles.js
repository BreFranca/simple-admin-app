import styled from "styled-components"

export const Container = styled.div`
  background: #e2e3e5;
  border-color: #e2e3e5;
  color: #383d41;
  border-radius: 3px;
  border: 1px solid transparent;
  padding: 10px 20px;
  margin: 0 20px 20px;
  &.success {
    color: #155724;
    background-color: #d4edda;
    border-color: #c3e6cb;
  }
  &.danger {
    color: #721c24;
    background-color: #f8d7da;
    border-color: #f5c6cb;
  }
  &.warning {
    color: #856404;
    background-color: #fff3cd;
    border-color: #ffeeba;
  }
  &.info {
    color: #0c5460;
    background-color: #d1ecf1;
    border-color: #bee5eb;
  }
`
