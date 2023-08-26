import { styled } from "styled-components";
import homeimg from '../assets/homepageimg.png'

const HomePage = () => {
    return (
        <Container>
            <Content>
                <Img src={homeimg} alt='home' />

                <Slogan>
                    <Title>What concerns you about your health today?</Title>
                    <Text>Check your symptoms and find out what is the best thing to do.</Text>
                    <Text>It's fast, free and anonymous.</Text>
                </Slogan>
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
    align-items: center;
    gap: 40px;
`

const Img = styled.img`
    width: 650px;
`

const Slogan = styled.div`
    width: 50%;
    text-align: center;
`

const Title = styled.main`
    text-transform: uppercase;
    font-size: 3vw;
    font-weight: bold;
    color: #6e53a0;
`

const Text = styled.p`
    font-size: 1.3vw;
`

export default HomePage;