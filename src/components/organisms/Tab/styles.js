import styled from "styled-components"

export const Container = styled.div`
    padding: 7px 10px;
    color: #707070;
    cursor: pointer;
    & + .tabs__tab {
        margin-left: 60px;
    }
    span {
        margin-right: 5px;
    }
    &.tabs__tab-link--active {
        background: #F0F0F7;
    }
`