import styled from "styled-components"

export const Row = styled.div`
    .col {
        flex: 1;
    }
    .header-item {
        display: flex;
        align-items: center;
        margin-bottom: 6px;
        padding: 0 50px 0 30px;
        .col {
            font-size: 12px;
            font-weight: 700;
            color: #92919D;
        }
    }
    .row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #F0F0F7;
        margin-bottom: 5px;
        height: 48px;
        padding: 0 50px 0 30px;
        span {
            color: #707070;
        }
        button {
            appearance: none;
            box-shadow: none;
            background: transparent;
            border: none;
            transition: .5s all linear;
            cursor: pointer;
            &:hover {
                opacity: .8;
            }
        }
    }
`