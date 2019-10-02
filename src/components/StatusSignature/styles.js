import styled from "styled-components"

export const Btn = styled.div`
    display: inline-block;
    background: #414141;
    color: #FFFFFF;
    border-radius: 5px;
    display: inline-block;
    font-size: 13px;
    padding: 1px 0;
    width: 110px;
    margin-left: 10px;
    font-weight: 700!important;
    text-transform: uppercase;
    text-align: center;
    span {
        margin-left: 2px;
        padding: 0;
        background: transparent;
        width: auto;
    }
    &.paid {
        background: #0CB5F4;
    }
    &.pending_payment {
        background: #FF9300;
    }
    &.unpaid {
        background: #BF0909;
    }
`