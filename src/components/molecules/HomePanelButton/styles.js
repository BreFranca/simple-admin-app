import styled from "styled-components"

export const HomePanelButton = styled.div`
  display: flex;
  flex-direction: row
  justify-content: space-between;
  align-items: center;

  a {
    color: #6d45c8;
    text-decoration: none;
    border-bottom: 1px dashed #6d45c8;

    &:hover {
      opacity: 0.7;
    }
  }
`
