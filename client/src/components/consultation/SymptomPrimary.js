import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { styled } from "styled-components";
import Sidebar from "../profile/SideBar";

const SymptomPrimary = () => {
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

    const handleYes = () => {
        navigate('/appointement');
    }

    const handleNo = () => {
        navigate(`/symptom-treatment/${symptom}`);
    }

    return (
        <Container>
            <Sidebar />
            {symptomInfo ? (
                <Content>
                    <h1>{symptomInfo.name}</h1>
                    <h2>Please, click Yes if you have any of the symptoms below, 
                        and if you don't have any of these symptoms click No.  
                    </h2>

                    <Urgency>
                        <div>
                            <p dangerouslySetInnerHTML={{ __html: symptomInfo.relevantParts[2].text }}></p>
                        </div>
                    </Urgency>

                    <Buttons>
                        <div>
                            <button onClick={handleYes}>Yes, I'm experiencing one of more of these symptoms.</button>
                        </div>

                        <div>
                            <button onClick={handleNo}>No, I'm not experiencing any of these symptoms.  </button>
                        </div>
                    </Buttons>
                    
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

    & h2 {
        margin-bottom: 20px;
    }
`;

const Urgency = styled.div`
    display: flex;
    justify-content: space-evenly;
`;

const Buttons = styled.div`
    display: flex;
    align-items: center;

    & button {
        background-color: #F2785C;
    }
`;

export default SymptomPrimary;