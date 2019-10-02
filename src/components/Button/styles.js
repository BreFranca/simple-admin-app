import styled from "styled-components"

export const Btn = styled.div`
    display: inline-block;
    & + div a, & + div button {
        margin-left: 20px;
    }
    a, button {
        appearance: none;
        cursor: pointer;
        font-family: inherit;
        text-decoration: none;
        background: #43415B;
        color: #FFFFFF;
        font-size: 12px;
        text-transform: uppercase;
        padding: 11px 13px 10px 13px;
        font-weight: bold;
        border-radius: 3px;
        transition: .4s all linear;
        box-shadow: none;
        border: none;
        &:hover {
            background: #5FB416;
        }
        i {
            margin-left: 6px;
        }
        :disabled {
            background-color: #43415b80;
            cursor: no-drop;
        }
    }
    &.underline {
        a, button {
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
        margin-left: 20px;
        margin-top: 0;
    }
    &.primary {
        a, button {
            font-size: 13px;
            background: #43415B;
            &:hover {
                background: #43415B;
            }
        }
    }
    &.grey {
        a, button {
            background: #D6D6D6;
            color: #262121;
            &:hover {
                color: #FFFFFF;
                background: #43415B;
            }
        }
    }
    &.success {
        a, button {
            font-size: 13px;
            background: #5FB416;
            &:hover {
                background: #43415B;
            }
        }
    }
    &.red {
        a, button {
            font-size: 13px;
            background: #cd4142;
            &:hover {
                background: #43415B;
            }
        }
    }
`