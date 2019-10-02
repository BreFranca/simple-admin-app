import styled from 'styled-components'

export const CollapseCheck = styled.input`
    display: none;
`

export const CollapseLabel = styled.label`
    background: #ccc;
    display: flex;
    align-items: center;
    font-weight: bold;
    padding: 1em 0.5em;
    width: 100%;
    cursor: pointer;
    transition: all 200ms ease-in-out;
    span {
        margin-left: 10px;
    }
    &:hover {
        color: #fff;
        background: #6d45c8;
    }
    ${CollapseCheck}:checked ~ & {
        background: #BBBBBB;
        color: #FFFFFF;
        &:hover {
            background: #CCCCCC;
            color: #000000;
        }
    }
`

export const CollapseContent = styled.div`
    background: #DDDDDD;
    padding: 1em 0.5em;
    height: 0;
    min-height: 0;
    opacity: 0;
    overflow: hidden;
    padding: 0 0.5em;
    transition: all 200ms ease-in-out;
    ${CollapseCheck}:checked ~ & {
        min-height: 30px;
        overflow: auto;
        height: auto;
        padding: 1em 0.5em;
        opacity: 1;
    }
`

export const CollapseContainer = styled.div`
    + div {
        margin-top: 20px;
    }
    &.expanded {
        ${CollapseContent} {
            display: block;
        }
    }
`