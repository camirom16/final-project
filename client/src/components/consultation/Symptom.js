import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Symptom = () => {
    const { symptom } = useParams();
    const [symptomInfo, setSymptomInfo] = useState(null);

    useEffect(() => {
        // Make an API call to your Express backend to fetch symptom information
        fetch(`/symptom/${symptom}`)
            .then((response) => response.json())
            .then((data) => {
                setSymptomInfo(data.data);
            })
            .catch((error) => {
                console.error(error);
                
            });
    }, [symptom]);

    return (
        <div>
            {symptomInfo ? (
                <div>
                    <h1>{symptomInfo.name}</h1>
                    
                    <h2>{symptomInfo.hasPart[1].headline}</h2>

                    <p dangerouslySetInnerHTML={{ __html: symptomInfo.hasPart[1].hasPart[1].text }}></p>

                    <h2> Please, go to the nearest E.R or call 911 if:</h2>

                    <p dangerouslySetInnerHTML={{ __html: symptomInfo.hasPart[4].hasPart[0].text }}></p>

                    <h2>Take an appointement with your doctor as soon as possible if:</h2>

                    <p dangerouslySetInnerHTML={{ __html: symptomInfo.hasPart[2].hasPart[0].text }}></p>

                    
                    
                </div>
            ) : (
                <p>Loading symptom information...</p>
            )}
        </div>
    );
};

export default Symptom;