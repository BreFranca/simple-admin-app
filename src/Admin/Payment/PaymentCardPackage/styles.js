import styled from 'styled-components'

export const Container = styled.div`
    background: #F0F0F7;
    padding: 21px 25px;
    max-width: 320px;
    width: 320px;
    min-height: 230px;
    transition: .4s all linear;
    &.discount {
        min-height: 270px;
    }
    h3, li {
        color: #43415B;
    }
    h3 {
        margin-bottom: 25px;
        font-size: 20px;
        font-weight: 400;
    }
    ul {
        li {
            display: flex;
            justify-content: space-between;
            list-style: none;
            font-size: 15px;
            margin-bottom: 17px;
        }
        &.total {
            padding-top: 8px;
            margin-top: 27px;
            border-top: 1px solid #D4D4D4;
            li {
                font-size: 17px;
            }
        }
    }
    &.current {
        h3, li {
            color: #92919D;
        }
    }
`
