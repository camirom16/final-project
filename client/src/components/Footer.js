import { styled } from "styled-components";
import logo from '../assets/logo.png';
import nhs from '../assets/nhs_attribution.png';

import { FiFacebook as Fb } from "react-icons/fi";
import { FiInstagram as Insta } from "react-icons/fi";
import { FiGithub as Git } from "react-icons/fi";
import { FiMail as Mail } from "react-icons/fi";
import { FiPhone as Phone } from "react-icons/fi";

const Footer = () => {
    return (

            <Container>
                <Up>
                    <div>
                        <LogoImg src={logo} alt='logo' />
                        <p><Mail /> info.health@email.com</p>
                        <p><Phone /> 1800-INFO-HEALTH</p>
                        <Icons>
                                <Fb size={32} /> 
                                <Insta size={32} /> 
                                <Git size={32} />
                        </Icons>
                    </div>

                    <NhsContainer>
                        <p>This website is powed by:</p>
                        <NhsImg src={nhs} alt='logo' />
                    </NhsContainer>
                </Up>

                <Down>
                    <p> Terms and coditions</p>
                    <p>Privacy policy</p>
                </Down>
                
            </Container>
    )
};

const Container = styled.div`
    height: 15vh;
    background-color: #F2785C;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px 40px 30px 40px;
    font-size: 0.8vw;
    font-weight: bold;
`

const Up = styled.div`
    display: flex;
    justify-content: space-between;

    & p {
        padding: 2px 0;
    }
`

const LogoImg = styled.img`
    width: 75%;
`

const Icons = styled.div`
    display: flex;
    padding: 20px ;
    gap: 20px;
`

const NhsContainer = styled.div`
    text-align: right;

    & p {
        padding-right: 80px;
    }
`

const NhsImg = styled.img`
    width: 50%;
`

const Down = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export default Footer;