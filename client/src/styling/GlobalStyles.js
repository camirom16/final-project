import { createGlobalStyle } from 'styled-components';
import { COLORS } from '../styling/constants';

const GlobalStyles = createGlobalStyle`
    p {
        font-size: 0.9vw;
    }

    button{
        font-size: 0.7vw;
        border: none;
        border-radius: 20px;
        background-color: ${COLORS.buttons};
        color: white;
        font-weight: bold;
        padding: 15px 30px;
        margin: 20px;
        cursor: pointer;

        &:hover {
            scale: 1.1;
        }
    }

    input, select {
        border-radius: 20px;
        font-size: 0.8vw;
        padding: 3px 15px;
        margin: 10px;
    }

    label {
        font-size: 0.8vw;
    }

    .radio {
        width: 1.5vw;
        height: 1.5vh;
    }

    form {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background-color: ${COLORS.secondary};
        border-radius: 30px;
        padding: 10px 30px 5px 30px;
        font-size: 0.9vw;
        text-align: center;
    }
`;

export default GlobalStyles;