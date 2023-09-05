import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { styled } from "styled-components";
import { COLORS } from "../../styling/constants";
import Sidebar from "../profile/SideBar";

const Symptom = () => {
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
        navigate(`/symptom-treatment/${symptom}`);
    }

    return (
        <Container>
            <Sidebar />
            {symptomInfo ? (
                <Content>
                    <h1>{symptomInfo.name}</h1>

                    <Urgency>
                        <Emergency>
                            {symptomInfo.relevantParts.map((part, index) => (
                                <div key={index}>
                                    {/* Check the identifier to determine how to render */}
                                    {part.identifier === 'immediate' && (
                                    <div>
                                        <h2>Please, call 911 or go to the neareast E.R if:</h2>
                                        <p dangerouslySetInnerHTML={{ __html: part.text }}></p>
                                    </div>
                                    )}
                                    {part.identifier === 'urgent' && (
                                    <div>
                                        <h2>Urgent Attention Required - Call your doctor for an immediate appointement or go to the E.R if:</h2>
                                        <p dangerouslySetInnerHTML={{ __html: part.text }}></p>
                                    </div>
                                    )}
                                </div>
                            ))}
                        </Emergency>

                        <Appointement>
                            <h2>Take an appointment with your doctor or NP as soon as possible if:</h2>
                            <p dangerouslySetInnerHTML={{ __html: symptomInfo.relevantParts[2].text }}></p>
                        </Appointement>
                    </Urgency>

                    <NoEmergency>
                        <h3>I understand, and I'm not experiencing symptoms requiring immediate attention</h3>
                        <button onClick={handleContinue}>Continue</button>
                    </NoEmergency>
                    
                </Content>
            ) : (
                <p>Loading...</p>
            )}
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    gap: 3%
`;

const Content = styled.div`
    width: 75%;
    display: flex;
    flex-direction: column;
    align-items: center;

    & h1 {
        margin-top: 1%;
        margin-bottom: 1%;
    }
`;

const Urgency = styled.div`
    display: flex;
    justify-content: space-evenly;
`;

const Emergency = styled.div`
    width: 37%;
    background-color: ${COLORS.buttons};
    border-radius: 30px;
    padding: 2%;
    margin: 1%;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

    & p {
        margin-top: 10px;
        margin-bottom: 10px;
    }

    &:hover {
        scale: 1.1;
    }
`;

const Appointement = styled.div`
    width: 37%;
    background-color: #F2785C;
    border-radius: 30px;
    padding: 2%;
    margin: 1%;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

    & p {
        margin-top: 10px;
        margin-bottom: 10px;
    }

    &:hover {
        scale: 1.1;
    }
`;

const NoEmergency = styled.div`
    display: flex;
    align-items: center;
`;

export default Symptom;