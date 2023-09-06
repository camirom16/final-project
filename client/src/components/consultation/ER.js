import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { COLORS } from "../../styling/constants";
import Sidebar from "../profile/SideBar";
import { UserContext } from "../profile/UserContext";

const ER = () => {
    const { currentUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleFinish = () => {
        navigate(`/profile/${currentUser._id}`);
    }

    return (
        <Container>
            <Sidebar />

            <Content>
                <Emergency>
                    <h1>Your symptoms requires an immediate evaluation.
                    Please, go to the neareast E.R or call 911 to get assistance.</h1>
                </Emergency>
    

                <Buttons>
                    <h3>I understand that my condition requires immediate care. </h3>
                    <button onClick={handleFinish}>Finish consultation</button>
                </Buttons>
            
            </Content>
                    
                
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    gap: 3%
`;

const Content = styled.div`
    width: 75%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    & h1 {
        margin-top: 1%;
        margin-bottom: 1%;
    }
`;

const Emergency = styled.div`
    width: 37%;
    background-color: ${COLORS.buttons};
    border-radius: 30px;
    padding: 2%;
    margin: 1%;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

    &:hover {
        scale: 1.1;
    }
`;

const Buttons = styled.div`
    display: flex;
    align-items: center;
    margin-top: 30px;
`;

export default ER;