import { styled } from "styled-components";
import error from '../../assets/error.png';

const Error = () => {
    return (
        <Container>
            <img src={error} alt='error' />
            
            <div>
                <h2>An unknow error has occured.</h2>
            </div>

            <div>
                <p>
                    Please try refreshing the page, 
                    or <span>contact support</span> if the problem persist.
                </p>
            </div>
        </Container>
    )
};

const Container = styled.div`
    height: 60vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 25px;

    & span {
        color: #432974;
        text-decoration: underline;
        cursor: pointer;
    }

    & img {
        width: 25vw;
    }
`;

export default Error;