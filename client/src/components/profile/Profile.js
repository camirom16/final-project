import { styled } from "styled-components";
import Sidebar from "./SideBar";
import start from "../../assets/profile-start.png"
import { COLORS } from "../../styling/constants";
import { useState } from "react";
import { Link } from "react-router-dom";

const Profile = () => {
    const [selectedSymptom, setSelectedSymptom] = useState("");
    //State to store the selected symptom

    return (

        <Container>
            <Sidebar />

            <Content>
                <ProfileStart>
                    <div>
                        <h1>WHAT CONCERNS YOU ABOUT YOUR HEALTH TODAY?</h1>
                        <p>Check in our list about your symptom and learn more about it.</p>
                        <p>The information you give is safe and won't be shared.</p>
                        <p>Your results will include: recommandations on what to do next.</p>
                    </div>

                    <div>
                        <select onChange={(e) => setSelectedSymptom(e.target.value)}>
                            <option>Please select your main symptom</option>
                            <option value="back-pain">Back pain</option>
                            <option value="bloating">Bloating</option>
                        </select>
                    </div>

                    <div>
                        <h2>Term of Service</h2>
                        <p>Before using the checkup, please read the Terms of Service and remember:</p>
                        <p>InfoHealth is nott a diagnosis. It's only for your information and not a qualified medical opinion.</p>
                        <p>InfoHealth is not for emergencies. If there's a helth emergency, please compose the 911 for immediatly assistance.</p>
                    </div>

                    <div>
                        <div>
                            <input type='checkbox' /><label>I read and accept Term of Service</label>
                        </div>
                        <div>
                            <input type='checkbox' /><label>I agree for my health information to be used for the interview. More information in the Privacy Policy.</label>
                        </div>
                    </div>

                    <div>
                        <Link to={selectedSymptom ? `/health-info/${selectedSymptom}` : "#"}>
                            <button>Start</button>
                        </Link>
                    </div>
                </ProfileStart>

                <div>
                    <Img src={start} alt='consultation' />
                </div>
            </Content>
            
        </Container>
    );
};

const ProfileStart = styled.div`
    width: 45vw;
    height: 45vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    & button {
        margin-left: 80%;
        background-color: ${COLORS.greenlink};
    }
`
const Img = styled.img`
    width: 20vw;
`

const Container = styled.div`
    width: 100vw;
    display: flex;
    gap: 40px;
`

const Content = styled.div`
    display: flex;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 20px;
    width: 80vw;
    gap: 10%;
`

export default Profile;