import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
    ${reset};

    html {
        font-size: 62.5%;
    }
    body {
        font-family: 'MalgunGothicWeb', '맑은 고딕', 'NanumGothic', sans-serif;
        font-size: 1.2rem;
        color: ${(props)=>props.theme.colors.neutral3};
    }
    button {
        cursor: pointer;
        outline: none;
        border-radius: 2px;
    }
`;

export default GlobalStyle;