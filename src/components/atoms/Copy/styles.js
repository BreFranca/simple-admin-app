import styled from "styled-components"

export const Container = styled.div`
    display: flex;
    align-items: center;
    border: 1px solid rgba(0, 0, 0, .1);
    padding: 5px 10px;
    border-radius: 5px;
`

export const Text = styled.p`
    color: #000000;
    font-size: 14px;
`

export const Button = styled.button`
    appearance: none;
    box-shadow: none;
    margin-left: 10px;
    background: #43425b;
    color: #FFFFFF;
    text-transform: uppercase;
    padding: 5px 10px;
    border-radius: 10px;
    font-weight: 700;
    cursor: pointer;
    transition: .4s all linear;
    &:hover {
        background: rgba(0, 0, 0, .7)
    }
`