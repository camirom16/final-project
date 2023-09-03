import { styled } from "styled-components";
import logo from '../../assets/logo.png'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../profile/UserContext";
import { FiUser as User } from "react-icons/fi";
import { FiLogOut as Logout } from "react-icons/fi";
import { FaHouseUser as UserHome } from "react-icons/fa";


const Header = () => {
    const { currentUser, logout } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <Container>
            <NavBar>
                <Pages>
                    <Img src={logo} alt='logo' onClick={() => navigate("/")}/>
                    <PageLink to="/about">About</PageLink>
                    <PageLink to="/how-it-works">How it works?</PageLink>
                    <PageLink to="/ressources">Ressources</PageLink>
                </Pages>

                <div>
                    {currentUser ? (
                        <Buttons>
                            <UserHome size={32} onClick={() => navigate(`/profile/${currentUser._id}`)} />
                            <Button onClick={handleLogout}>
                                Logout <span><Logout size={28} /></span>
                            </Button>
                        </Buttons>
                    ) : (
                        <Buttons>
                            <Button onClick={() => navigate("/new-account")}>Create an account</Button>
                            <PageLink to="/login"><User size={26} /> Login</PageLink>
                        </Buttons>
                    )}
                    
                </div>
            </NavBar>
        </Container>
    )
};

const Container = styled.div`
    background-color: #F2BE5C;
`

const NavBar = styled.div`
    height: 10vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px;
    padding: 0 40px;
    border-radius: 40px;
    background-color: white;
    color: #244334;
    font-weight: bold;
    font-size: 1vw;
    font-weight: bolder;
`

const Pages = styled.div`
    width: 70%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 30px;
    cursor: pointer;
`

const Img = styled.img`
    width: 15%;
`

const PageLink = styled(Link)`
    text-decoration: none;
    color: #244334;
`

const Buttons = styled.div`
    display: flex;
    align-items: center;
`

const Button = styled.button`
    font-size: 1vw;
    border: none;
    border-radius: 25px;
    background-color: #eb5154;
    color: white;
    font-weight: bold;
    padding: 20px 35px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    margin-right: 30px;
    display: flex;
    align-items: center;

    &:hover {
        scale: 1.1;
    }

    & span {
        margin-left: 10px;
    }
`

export default Header;