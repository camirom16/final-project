import React, { useContext, useState } from "react";
import { UserContext } from "./UserContext";
import { styled } from "styled-components";
import Sidebar from "./SideBar";
import { COLORS } from "../../styling/constants";

const Update = () => {
    const { currentUser } = useContext(UserContext);
    // console.log(currentUser)

    const [newFormData, setNewFormData] = useState({
        name: '',
        email: '',
        age: '',
        password: '',
        confirmPassword: '',
        gender: '',
        allergies: '',
        medication: '',
        weight: '',
        hta: '',
        dlp: '',
        db: '',
        smoke: '',
        injury: '',
        pregnant: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleUpdateSubmit = (ev) => {
        ev.preventDefault();

        fetch(`/account/${currentUser.id}/update`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newFormData),
        })
            .then((response) => response.json())
            .then(data => {
                if (data.status >= 400) {
                    alert(data.message)
                }
                else {
                    console.log('Account updated:', data)
                }
            })
            .catch((error) => console.log(error.message));
    }

    return (

        <Container>
            <Sidebar />

            <Content>
                <form onSubmit={handleUpdateSubmit}> 

                    <div>
                        <h1>Update your profile</h1>
                        <p>Please, complete this form if your medical information has changed.</p>
                    </div>
                    
                    <div> 
                        <div>
                            <AccountInfo>
                                <label htmlFor="password">Change your password: </label>
                                <input type="password" name="password" id="password" value={newFormData.password} onChange={handleInputChange} />
                            </AccountInfo>

                            <AccountInfo>
                                <label htmlFor="confirmPassword">Confirm your password: </label>
                                <input type="password" name="confirmPassword" id="confirmPassword" value={newFormData.confirmPassword} onChange={handleInputChange} />
                            </AccountInfo>
                        </div>

                        <Question>
                            <label htmlFor="age">How old are you? </label>
                            <div>
                                <input className='age' type="age" name="age" id="age" maxLength="2" value={currentUser.medicalInfo.age} onChange={handleInputChange} />
                                <span className='age'>years</span>
                            </div>
                        </Question>

                        <Question>
                            <label htmlFor="gender">What is your gender?</label>
                            <select name="gender" id="gender" value={currentUser.medicalInfo.gender} onChange={handleInputChange}>
                                    <option value="">Select an option</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="nobinary">No Binary</option>
                                    <option value="other">Other</option>
                                    <option value="noanswer">I prefer not to answer</option>
                            </select>
                        </Question>

                        <Question>
                            <label>Do you have any allergies? <span>Your answer: {currentUser.medicalInfo.allergies}</span></label>
                            <div>
                                    <input type="radio" className='radio' id="allergiesyes" name="allergies" value="yes" onChange={handleInputChange} />
                                    <label htmlFor="allergiesyes">Yes</label>

                                    <input type="radio" className='radio' id="allergiesno" name="allergies" value="no" onChange={handleInputChange} />
                                    <label htmlFor="allergiesno">No</label>
                                
                                    <input type="radio" className='radio' id="allergiesunknown" name="allergies" value="unknown" onChange={handleInputChange} />
                                    <label htmlFor="allergiesunknown">I don't know</label>
                            </div>
                        </Question>

                        <Question>
                            <label>Do you take medication on a regular basis? <span>Your answer: {currentUser.medicalInfo.medication}</span></label>
                            <div>
                                <input type="radio" className='radio' id="medicationyes" name="medication" value="yes" onChange={handleInputChange} />
                                <label htmlFor="medicationyes">Yes</label>

                                <input type="radio" className='radio' id="medicationno" name="medication" value="no" onChange={handleInputChange} />
                                <label htmlFor="medicationno">No</label>
                            
                                <input type="radio" className='radio' id="medicationunknown" name="medication" value="unknown" onChange={handleInputChange} />
                                <label htmlFor="medicationunknown">I don't know</label>
                            </div>
                        </Question>

                        <Question>
                            <label>Are you overweight or obese? <span>Your answer: {currentUser.medicalInfo.weight}</span></label>
                            <div>
                                <input type="radio" className='radio' id="weightyes" name="weight" value="yes" onChange={handleInputChange} />
                                <label htmlFor="weightyes">Yes</label>

                                <input type="radio" className='radio' id="weightno" name="weight" value="no" onChange={handleInputChange} />
                                <label htmlFor="weightno">No</label>
                            
                                <input type="radio" className='radio' id="weightunknown" name="weight" value="unknown" onChange={handleInputChange} />
                                <label htmlFor="weightunknown">I don't know</label>
                            </div>
                        </Question>

                        <Question>
                            <label>Do you have hypertension? <span>Your answer: {currentUser.medicalInfo.hta}</span></label>
                            <div>
                                <input type="radio" className='radio' id="htayes" name="hta" value="yes" onChange={handleInputChange} />
                                <label htmlFor="htayes">Yes</label>

                                <input type="radio" className='radio' id="htano" name="hta" value="no" onChange={handleInputChange} />
                                <label htmlFor="htano">No</label>
                            
                                <input type="radio" className='radio' id="htaunknown" name="hta" value="unknown" onChange={handleInputChange} />
                                <label htmlFor="htaunknown">I don't know</label>
                            </div>
                        </Question>

                        <Question>
                            <label>Do you have hight cholesterol? <span>Your answer: {currentUser.medicalInfo.dlp}</span></label>
                            <div>
                                <input type="radio" className='radio' id="dlpyes" name="dlp" value="yes" onChange={handleInputChange} />
                                <label htmlFor="dlpyes">Yes</label>

                                <input type="radio" className='radio' id="dlpno" name="dlp" value="no" onChange={handleInputChange} />
                                <label htmlFor="dlpno">No</label>
                            
                                <input type="radio" className='radio' id="dlpunknown" name="dlp" value="unknown" onChange={handleInputChange} />
                                <label htmlFor="dlpunknown">I don't know</label>
                            </div>
                        </Question>

                        <Question>
                            <label>Do you have diabetes? <span>Your answer: {currentUser.medicalInfo.db}</span></label>
                            <div>
                                <input type="radio" className='radio' id="dbyes" name="db" value="yes" onChange={handleInputChange} />
                                <label htmlFor="dbyes">Yes</label>

                                <input type="radio" className='radio' id="dbno" name="db" value="no" onChange={handleInputChange} />
                                <label htmlFor="dbno">No</label>
                            
                                <input type="radio" className='radio' id="dbunknown" name="db" value="unknown" onChange={handleInputChange} />
                                <label htmlFor="dbunknown">I don't know</label>
                            </div>
                        </Question>

                        <Question>
                            <label>Have you smoked cigarettes for at least 10 years? <span>Your answer: {currentUser.medicalInfo.smoke}</span></label>
                            <div>
                                <input type="radio" className='radio' id="smokeyes" name="smoke" value="yes" onChange={handleInputChange} />
                                <label htmlFor="smokeyes">Yes</label>

                                <input type="radio" className='radio' id="smokeno" name="smoke" value="no" checked={newFormData.smoke === "no"} onChange={handleInputChange} />
                                <label htmlFor="smokeno">No</label>
                            
                                <input type="radio" className='radio' id="smokeunknown" name="smoke" value="unknown" checked={newFormData.smoke === "unknown"} onChange={handleInputChange} />
                                <label htmlFor="smokeunknown">I don't know</label>
                            </div>
                        </Question>

                        <Question>
                            <label>Have you recently suffered an injury or an operation? <span>Your answer: {currentUser.medicalInfo.injury}</span></label>
                            <div>
                                <input type="radio" className='radio' id="injuryyes" name="injury" value="yes" onChange={handleInputChange} />
                                <label htmlFor="injuryyes">Yes</label>

                                <input type="radio" className='radio' id="injuryno" name="injury" value="no" checked={newFormData.injury === "no"} onChange={handleInputChange} />
                                <label htmlFor="injuryno">No</label>
                            
                                <input type="radio" className='radio' id="injuryunknown" name="injury" value="unknown" checked={newFormData.injury === "unknown"} onChange={handleInputChange} />
                                <label htmlFor="injuryunknown">I don't know</label>
                            </div>
                        </Question>

                        <Question>
                            <label>Are you pregnant? <span>Your answer: {currentUser.medicalInfo.pregnant}</span></label>
                            <div>
                                <input type="radio" className='radio' id="pregnantyes" name="pregnant" value="yes" onChange={handleInputChange} />
                                <label htmlFor="pregnantyes">Yes</label>

                                <input type="radio" className='radio' id="pregnantno" name="pregnant" value="no" checked={newFormData.pregnant === "no"} onChange={handleInputChange} />
                                <label htmlFor="pregnantno">No</label>
                            
                                <input type="radio" className='radio' id="pregnantunknown" name="pregnant" value="unknown" checked={newFormData.pregnant === "unknown"} onChange={handleInputChange} />
                                <label htmlFor="pregnantunknown">I don't know</label>
                            </div>
                        </Question>
                    </div>  

                    <div>
                        <button type="submit">Update</button>
                    </div>
                </form>
            </Content>
            
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    gap: 15%;
`

const Content = styled.div`
    margin-top: 20px;
    margin-bottom: 20px;
    width: 50vw;

    & form {
        background-color: transparent;
    }

    & p {
        margin-bottom: 20px;
    }
`
const AccountInfo = styled.div`
    width: 65%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 20%;
`;

const Question = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    & .age {
        width: 10%;
        text-align: center;
        color: black;
    }

    & span {
        color: ${COLORS.buttons};
        font-style: italic;
    }
`;


export default Update;