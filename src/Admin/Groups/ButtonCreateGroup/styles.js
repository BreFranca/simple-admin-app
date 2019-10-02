import styled from "styled-components"

export const Button = styled.button`
    appearance: none;
    box-shadow: none;
    border: none;
    font-family: inherit;
    background: #F0F0F7;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 215px;
    height: 60px;
    cursor: pointer;
    transition: .4s all linear;
    font-size: 20px;
    &.active {
        background: #3DC11E;
        color: #FFFFFF;
    }
    &:hover {
        background: #CECECE;
    }
    & + button {
        margin-left: 50px;
    }
`

export const Icon = styled.img`
    margin-right: 18.4px;
    max-width: 41px;
`