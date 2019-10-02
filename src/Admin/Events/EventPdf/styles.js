import styled from "styled-components"

export const Container = styled.div`
    background: #FFFFFF;
`

export const Grid = styled.div`
    padding: 118px 0;
    max-width: 90%;
    margin: 0 auto;
`

export const Header = styled.div`
    background: #EBEBEB;
    padding: 25px 45px;
    display: flex;
    margin-bottom: 50px;
    align-items: center;
    img {
        margin-right: 35px;
        max-width: 120px;
    }
    h2 {
        font-size: 32px;
        font-weight: 700;
    }
    h3 {
        font-size: 29px;
        font-weight: 700;
    }
    p {
        font-size: 29px;
        font-weight: 400;
    }
`

export const Question = styled.div`
    border: 2px solid #636363;
    margin-bottom: 53px;
    &:last-child {
        margin-bottom: 0;
    }
` 

export const HeaderQuestion = styled.div`
    background: #EBEBEB;
    padding: 25px 25px 15px 25px;
    h4 {
        font-size: 25px;
        font-weight: 700;
        margin-bottom: 10px;
    }
    h5 {
        font-size: 22px;
        font-weight: 400;
    }
`

export const ContentQuestion = styled.div`
    padding: 40px 25px;
    table {
        width: 100%;
        border-collapse: collapse;
        tr {
            td, th {
                width: 25%;
                &:first-child {
                    padding-left: 15px;
                }
                &:last-child {
                    padding-right: 15px;
                }
            }
        }
        thead {
            tr {
                text-align: left;
                height: auto;
                font-size: 18px;
                th {
                    height: auto;
                    min-height: auto;
                    overflow: auto;
                }
            }
        }
        tbody {
            tr {
                height: 80px;
                font-size: 16px;
                &:nth-child(odd) {
                    background: #EBEBEB;
                }
            }
            td {
                min-height: 100%;
                max-height: 100%;
                overflow: hidden;
            }
        }
    }
` 