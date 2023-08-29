import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { COLORS } from "../styling/constants";

const ConfirmationAccount = () => {
    const navigate = useNavigate();

    return (
        <Container>
            <WelcomeBox>
                <h1>Welcome!</h1>

                <div>
                    <h3> Your account is now created.</h3>
                    <h3>Please login.</h3>
                </div>

                <div>
                    {/* Enters to the user's profile */}
                    <Button onClick={() => navigate("/login")}>Continue</Button>
                </div>
            </WelcomeBox>
        </Container>
    )
};

const Container = styled.div`
    width: 100%;
    height: 66vh;
    display: flex;
    justify-content: center;
    align-items: center;
`

const WelcomeBox = styled.div`
    height: 25vh;
    width: 25vw;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: ${COLORS.secondary};
    border-radius: 30px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    padding: 30px;
    font-size: 1vw;
    text-align: center;
`

const Button = styled.button`
    font-size: 1vw;
    margin: 0;
`

export default ConfirmationAccount;