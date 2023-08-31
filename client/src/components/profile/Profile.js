import React, { useContext } from "react";
import { UserContext } from "../profile/UserContext";
import { styled } from "styled-components";
import Sidebar from "./SideBar";

const Profile = () => {
    const { currentUser } = useContext(UserContext);


    return (

        <Container>
            <Sidebar />

            <Content>
                Hello, {currentUser.name}
            </Content>
            
        </Container>
    );
};

const Container = styled.div`
    width: 100vw;
    display: flex;
    gap: 40px;
`

const Content = styled.div`
    margin-top: 20px;
    margin-bottom: 20px;
    width: 80vw;
`



export default Profile;