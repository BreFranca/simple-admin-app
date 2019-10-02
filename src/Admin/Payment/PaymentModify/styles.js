import styled from 'styled-components'

export const Container = styled.div`
    .header {
        border-bottom: none;
    }
    .infos {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        margin-bottom: 35px;
        img {
            margin: 100px 18px 0;
        }
    }
    .slice {
        margin-bottom: 50px;
        padding-top: 35px;
        max-width: 650px;
        h3 {
            margin-bottom: 12px;
            font-weight: 400;
            color: #707070;
        }
    }
    .validateError {
        color: red;
        display: block;
    }
    .btns {
        text-align: right;
    }
    .btn-card {
        margin-top: 20px;
        text-align: center;
        button {
            appearance: none;
            box-shadow: none;
            border: none;
            text-decoration: underline;
            cursor: pointer;
            color: #2259A5;
        }
    }
    .content-card {
        display: flex;
        .form-card {
            max-width: 450px;
            width: 450px;
            margin-right: 100px;
        }
        .rccs {
            margin: 0;
        }
    }
    .input-group {
        margin-bottom: 18px;
        &.input-cvc {
            display: flex;
            align-items: flex-end;
        }
        img {
            margin-bottom: 13px;
            margin-left: 20px;
        }
    }
    .input-radio {
        padding-right: 8px
    }
    .radio-text {
        padding-left: 4px
    }
    .input-back {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        input {
            max-width: 90px;
        }
    }
`