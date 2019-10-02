import styled from "styled-components"

export const Content = styled.div`
  h1 {
    color: #6d45c8;
    font-size: 48px;
    text-shadow: 2px 2px 1px rgba(0, 0, 0, 0.3);
    margin: 20px 0;
  }
  h2 {
    font-size: 36px;
    text-shadow: 2px 2px 1px rgba(0, 0, 0, 0.2);
    margin: 20px 0;
  }
  h3 {
    font-size: 24px;
    text-shadow: 2px 2px 1px rgba(0, 0, 0, 0.1);
    margin: 15px 0;
  }
  hr {
    margin: 15px 0;
  }
  p,
  li {
    color: #444;
    margin-bottom: 1.2em;
    letter-spacing: 0.04em;
    line-height: 1.2em;
    text-align: justify;
  }
  ul {
    margin-left: 25px;
  }
  a {
    color: #6d45c8;
    font-weight: bold;
    border-bottom: 1px dashed #6d45c8;
    text-decoration: none;

    &:hover {
      opacity: 0.7;
    }
  }
`
