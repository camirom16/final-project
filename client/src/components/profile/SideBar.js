import { useContext } from "react";
import { UserContext } from "../profile/UserContext";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { COLORS } from "../../styling/constants";
import { FiUser as User } from "react-icons/fi";
import { FiTrash2 as Trash } from "react-icons/fi";

const Sidebar = () => {
    const { currentUser } = useContext(UserContext);
    const navigate = useNavigate();

    return (
        <Container>
            <div>
                <Button>
                    <User size={22} /> Hello, {currentUser.name}!
                </Button>

                <Buttons>
                    <ProfileButtons>
                        <button onClick={() => navigate(`/profile/${currentUser._id}`)}>New Consultation</button>
                        <button onClick={() => navigate(`/profile/${currentUser._id}/settings`)}>Account Settings </button>
                    </ProfileButtons>
                </Buttons>
            </div>

            <div>
                <Delete onClick={() => navigate(`/profile/${currentUser._id}/delete`)}><Trash size={26} /> Delete my account</Delete>
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
    width: 16vw;
    background-color: ${COLORS.secondary};
    text-align: center;
`
const Button = styled.button`
    font-size: 1vw;
    background-color: transparent;
    padding: 20px 35px;
    margin-right: 30px;
    text-align: center;
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

const Delete = styled.button`
    background-color: transparent;
    color: ${COLORS.links};
    display: flex;
    align-items: center;
`

export default Sidebar;