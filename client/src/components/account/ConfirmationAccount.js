import { useNavigate, useParams } from "react-router-dom";
import { styled } from "styled-components";
import { COLORS } from "../../styling/constants";
import { useEffect, useState } from "react";

const ConfirmationAccount = () => {
    const { accountId } = useParams();
    const [accountName, setAccountName] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`/account/${accountId}`)
            .then(response => response.json())
            .then((data) => {
                if (data.status === 400 || data.status === 500) {
                    throw new Error(data.message);
                }
                else {
                    setAccountName(data.data.name);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }, [accountId])

    return (
        <Container>
            <WelcomeBox>
                <h1>Welcome {accountName}!</h1>

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