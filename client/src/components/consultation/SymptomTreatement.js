import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../profile/UserContext";
import { styled } from "styled-components";
import { COLORS } from "../../styling/constants";
import Sidebar from "../profile/SideBar";

const SymptomTreatement = () => {
    const { currentUser } = useContext(UserContext);
    const { symptom } = useParams();
    const [symptomInfo, setSymptomInfo] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Make the API call and fetch the symptom information
        fetch(`/symptom/${symptom}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.status >=400) {
                    throw new Error(data.message);
                }
                else {
                    setSymptomInfo(data.data);
                }
            })
            .catch((error) => {
                console.error(error);
                
            });
    }, [symptom]);

    const handleContinue = () => {
        navigate(`/profile/${currentUser._id}`);
    }

    return (
        <Container>
            <Sidebar />
            {symptomInfo ? (
                <Content>
                    <h1>{symptomInfo.name}</h1>
                    <h2>If you don't have any symptoms to go to the E.R or to go to see your doctor immediatly, you can do this at home:</h2>

                    <Treatement>
                        <Do>
                            <h2>Do</h2>
                            <p dangerouslySetInnerHTML={{ __html: symptomInfo.relevantParts[0].text }}></p>
                        </Do>

                        <Dont>
                            <h2>Don't</h2>
                            <p dangerouslySetInnerHTML={{ __html: symptomInfo.relevantParts[1].text }}></p>
                        </Dont>
                    </Treatement>

                    <Final>
                        <button onClick={handleContinue}>BACK HOME</button>
                        <p>Remember, this is not a diagnosis. If your health is not getting better take an appointement with you health care provider.</p>
                    </Final>
                    
                </Content>
            ) : (
                <p>Loading symptom information...</p>
            )}
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    gap: 3%;
`;

const Content = styled.div`
    width: 75%;
    display: flex;
    flex-direction: column;
    align-items: center;

    & h1 {
        margin-top: 2%;
    }

    & h2 {
        margin-bottom: 2%;
        text-align: center;
    }
`;

const Treatement = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Do = styled.div`
    width: 37%;
    background-color: #9fdebc;
    border-radius: 30px;
    padding: 3%;
    margin: 1%;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

    & p {
        margin-top: 10px;
        margin-bottom: 10px;
    }

    & h3 {
        text-align: center;
    }

    &:hover {
        scale: 1.1;
    }
`;

const Dont = styled.div`
    width: 37%;
    background-color: #899dd1;
    border-radius: 30px;
    padding: 3%;
    margin: 1%;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

    & p {
        margin-top: 10px;
        margin-bottom: 10px;
    }

    & h3 {
        text-align: center;
    }

    &:hover {
        scale: 1.1;
    }
`;

const Final = styled.div`
    margin-top: 5%;
    text-align: center;

    & button {
        background-color: ${COLORS.greenlink};
    }
`;

export default SymptomTreatement;