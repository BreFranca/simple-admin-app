import styled from "styled-components"

export const ModalContainer = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 3;
    display: none;
    align-items: center;
    justify-content: center;
    &.modalShow {
        display: flex;
    }
    &.center {
        text-align: center;
    }
`

export const Mask = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(41, 41, 41, .4)
`

export const ModalContent = styled.div`
    position: relative;
    background: #FFFFFF;
    border-radius: 3px;
    min-width: 496px;
    min-height: 150px;
    padding: 26px 35px 30px;
    h3 {
        font-size: 24px;
        font-weight: 400;
        margin-bottom: 16px;
    }
    p {
        font-size: 17px;
        margin-bottom: 16px;
    }
`