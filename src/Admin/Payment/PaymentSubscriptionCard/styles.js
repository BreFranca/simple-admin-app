import styled from "styled-components"

export const Card = styled.div`
    background: #F0F0F7;
    border-radius: 18px;
    max-width: 256px;
    width: 256px;
    height: 126px;
    flex-direction: column;
    display: flex;
    justify-content: space-between;
    padding: 19px 27px;
    margin-left: 8px;
    margin-right: 8px;
    div {
        margin-left: 0;
    }
    h3 {
        font-size: 17px;
        color: #92919D;
        line-height: 24px;
    }
    p {
        font-size: 14px;
        color: #92919D;
        strong {
            font-weight: 700;
        }
    }
`