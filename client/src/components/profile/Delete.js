import { styled } from "styled-components";
import Sidebar from "./SideBar";
import { COLORS } from "../../styling/constants";

const Delete = () => {
    return (
        <Container>
            <Sidebar />

            <Content>
                <h1>Are you sure you want to delete your account?</h1>

                <div>
                    <h2>We are sorry to see you go!</h2>
                    <p>Remember, you can always create a new account again. </p>
                </div>

                <button>Confirm, delete my account</button>
            </Content>
        </Container>
    )
};

const Container = styled.div`
    display: flex;
    gap: 40px;
`

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
`

export default Delete;