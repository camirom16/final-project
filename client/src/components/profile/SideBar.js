import { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../profile/UserContext";
import { useNavigate } from "react-router-dom";
import { COLORS } from "../../styling/constants";

const Sidebar = () => {
    const { currentUser, logout } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <Container>
            <Buttons>
                <ProfileButtons>
                    <button onClick={() => navigate(`/profile/${currentUser._id}`)}>Home</button>
                    {/* <button onClick={() => navigate(`/profile/${currentUser._id}/consultation`)}>Start</button> */}
                    {/* <button onClick={() => navigate(`/profile/${currentUser._id}/history`)}>History</button> */}
                    <button onClick={() => navigate(`/profile/${currentUser._id}/settings`)}>Settings</button>
                </ProfileButtons>
            </Buttons>

            <div>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 25px;
    border-radius: 25px;
    height: 66vh;
    width: 15vw;
    background-color: ${COLORS.secondary};
`

const Buttons = styled.div`
    display: flex;
    flex-direction: column;

`

const ProfileButtons = styled.div`
    display: flex;
    flex-direction: column;

    & button {
        background-color: transparent;
        text-align: left;
        text-transform: uppercase;
    }
`

export default Sidebar;