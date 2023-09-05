import { styled } from "styled-components";
import { COLORS } from "../../styling/constants";

const HowWorks = () => {
    return (
        <Container>
            <Content>
                <First>
                    <h2>1</h2>
                    <h3>Create an Account</h3>
                    <p>Complete your profile and login into your account.</p>
                </First>

                <Second>
                    <h2>2</h2>
                    <h3>Start your consultation</h3>
                    <p>Select your main symptom.</p>
                </Second>

                <Third>
                    <h2>3</h2>
                    <h3>Find what to do</h3>
                    <p>Read carefully the information given and find out if you need to go to the E.R, 
                        take an appointment with your doctor or if you can do something at home first.
                    </p>
                </Third>
            </Content>
        </Container>
    )
};

const Container = styled.div`
    height: 66vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const Content = styled.div`
    display: flex;
    justify-content: center;
    gap: 3%;
`;

const First = styled.div`
    width: 20%;
    padding: 2%;
    background-color: ${COLORS.secondary};
    border-radius: 30px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

    & h2 {
        font-size: 30px;
        background-color: ${COLORS.purpletext};
        padding: 4%;
        width: 10%;
        text-align: center;
        border-radius: 20px;
        margin-bottom: 3%;
    }

    & h3 {
        font-size: 30px;
    }
`;

const Second = styled.div`
    width: 20%;
    padding: 2%;
    background-color: ${COLORS.secondary};
    border-radius: 30px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

    & h2 {
        font-size: 30px;
        background-color: ${COLORS.purpletext};
        padding: 4%;
        width: 10%;
        text-align: center;
        border-radius: 20px;
        margin-bottom: 3%;
    }

    & h3 {
        font-size: 30px;
    }
`;

const Third = styled.div`
    width: 20%;
    padding: 2%;
    background-color: ${COLORS.secondary};
    border-radius: 30px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

    & h2 {
        font-size: 30px;
        background-color: ${COLORS.purpletext};
        padding: 4%;
        width: 10%;
        text-align: center;
        border-radius: 20px;
        margin-bottom: 3%;
    }

    & h3 {
        font-size: 30px;
    }
`;

export default HowWorks;