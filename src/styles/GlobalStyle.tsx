import {createGlobalStyle} from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
    ${reset};
    /* Chrome, Safari, Edge, Opera */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    /* Firefox  */
    input[type='number'] {
        -moz-appearance: textfield;
    }

    html {
        font-size: 62.5%;
    }
    body {
        font-family: 'MalgunGothicWeb', '맑은 고딕', 'NanumGothic', sans-serif;
        font-size: 1.2rem;
        color: ${props => props.theme.colors.neutral3};
        letter-spacing: -0.1rem;
    }
    input {
        border-radius: 2px;
        outline: none;
        border: none;
    }
    button {
        cursor: pointer;
        outline: none;
        border-radius: 2px;
        background:transparent;
        border:none;
        padding:0;
    }
`;

export default GlobalStyle;
