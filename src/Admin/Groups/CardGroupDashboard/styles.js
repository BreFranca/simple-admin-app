import styled from 'styled-components'

export const Image = styled.div`
    background-color: black
    width: 130px;
    min-width: 130px;
    height: 100%;
    position: relative;
    overflow: hidden;
    img {
        transition: .4s all linear;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        height: auto;
    }
`
export const Content = styled.div`
    background: #FFFFFF;
    padding: 11px 23px 17px 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    transition: all .4s linear;
`

export const Category = styled.p`
    font-size: 15px;
`

export const Card = styled.div`
    background: #FFFFFF;
    border-radius: 10px;
    display: flex;
    max-width: 355px;
    min-width: 350px;
    height: 122px;
    margin: 20px;
    overflow: hidden;
    box-shadow: 0 0 4px rgba(0, 0, 0, .09);
    cursor: pointer;
    .status-container {
        text-align: right;
    }
    &:hover {
        ${Content} {
            background: #BBBBBB;
        }
        ${Image} {
            img {
                width: 110%;
            }
        }
    }
`