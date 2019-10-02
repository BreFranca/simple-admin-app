import styled from 'styled-components'

export const Tab = styled.button`
    appearance: none;
    box-shadow: none;
    border: none;
    padding: 7px 10px;
    color: #707070;
    cursor: pointer;
    font-size: 17px;
    & + button {
        margin-left: 60px;
    }
    span {
        margin-right: 5px;
    }
    &.active {
        background: #F0F0F7;
    }
`

export const Tabs = styled.div`
    display: flex;
    border-bottom: 1px solid #C7C7C7;
    padding: 0 25px;
`

export const TabContent = styled.div`
    padding: 40px 25px;
    display: none;
    &.active {
        display: block;
    }
`