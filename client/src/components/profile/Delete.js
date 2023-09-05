import { useContext, useState } from "react";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import Sidebar from "./SideBar";
import { COLORS } from "../../styling/constants";

const Delete = () => {
    const { currentUser, logout } = useContext(UserContext);
    const [accountDeleted, setAccountDeleted] = useState(false);

    const navigate = useNavigate();

    const handleDelete = () => {
        fetch(`/account/${currentUser._id}`, {
            method: "DELETE",
            headers:{
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status >= 400) {
                    alert(data.message);
                }
                else {
                    setAccountDeleted(true);
                    alert("Your account has been deleted.")
                    logout();
                    navigate('/');
                }
            })
            .catch((error) => console.log(error.message));
    }

    return (
        <Container>
            <Sidebar />

            <Content>
                {accountDeleted ? (
                    <h1> Your account has been deleted.</h1>
                ) : (
                    <>
                        <h1>Are you sure you want to delete your account?</h1>

                        <div>
                            <h2>We are sorry to see you go!</h2>
                            <p>Remember, you can always create a new account again. </p>
                        </div>

                        <button onClick={handleDelete}>Confirm, delete my account</button>
                    </>
                )}
                
            </Content>
        </Container>
    )
};

const Container = styled.div`
    display: flex;
    gap: 40px;
`;

const Content = styled.div`
    width: 30vw;
    gap: 10%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left: 20%;
    text-align: center;

    & h1 {
        color: ${COLORS.buttons}
    }
`;

export default Delete;