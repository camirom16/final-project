import { useContext, useState } from "react";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import Sidebar from "./SideBar";

const UpdateAccount = () => {
    const { currentUser } = useContext(UserContext);
    const navigate = useNavigate();

    // Initialize the formData with the current user's data
    const initialFormData = {
        medicalInfo: {
            age: currentUser.medicalInfo.age,
            gender: currentUser.medicalInfo.gender,
            allergies: currentUser.medicalInfo.allergies,
            db: currentUser.medicalInfo.db,
            dlp: currentUser.medicalInfo.dlp,
            hta: currentUser.medicalInfo.hta,
            injury: currentUser.medicalInfo.injury,
            medication: currentUser.medicalInfo.medication,
            pregnant: currentUser.medicalInfo.pregnant,
            smoke: currentUser.medicalInfo.smoke,
            weight: currentUser.medicalInfo.weight,
        },
        password: currentUser.password,
        confirmPassword: '',
    };

    // Use state to track changes in formData
    const [formData, setFormData] = useState(initialFormData);

    // Initialize a state variable to track the updated fields
    const [updatedFields, setUpdatedFields] = useState({});

    // Initialize a state variable for the password input
    const [newPassword, setNewPassword] = useState('');

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'password') {
            // Handle changes in the password field
            setNewPassword(value);
        } else if (name === 'confirmPassword') {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        } else {
            // Handle changes in other fields
            setFormData((prevData) => ({
                ...prevData,
                medicalInfo: {
                    ...prevData.medicalInfo,
                    [name]: value,
                },
            }));
        }

        // Update the updatedFields state with the changed field
        setUpdatedFields((prevFields) => ({
            ...prevFields,
            [name]: value,
        }));
    };

    const handleUpdateAccount = (ev) => {
        ev.preventDefault();

        // Check if the password and confirmPassword match
        if (newPassword && newPassword !== formData.confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        // Check if the password is as required
        const passwordPattern = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
        if (newPassword && !passwordPattern.test(newPassword)) {
            alert("Password must be at least 8 characters long and include an uppercase letter, a symbol, and a number.");
            return;
        }

        // PATCH request to update the account and only the updated fields are send to the BE
        fetch(`/account/${currentUser._id}`, {
            method: "PATCH",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ fieldsToUpdate: updatedFields }),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.status >= 400) {
                alert(data.message);
            } else {
                alert('Account information updated successfully');
                navigate(`/profile/${currentUser._id}`);
            }
        })
        .catch((error) => console.log("Fetch error:", error.message));
    };

    return (
        <Container>
            <Sidebar />

            <Content>
                <form onSubmit={(ev) => handleUpdateAccount(ev)}>

                    <div>
                        <h1>Update your account</h1>
                        <p>Please, update your medical information or you password.</p>
                    </div>
                    
                    <div> 
                        <div>
                            <AccountInfo>
                                <label htmlFor="password">Create a new password: </label>
                                <input type="password" name="password" id="password" onChange={handleInputChange}/>
                            </AccountInfo>

                            <AccountInfo>
                                <label htmlFor="confirmPassword">Confirm your password: </label>
                                <input type="password" name="confirmPassword" id="confirmPassword" onChange={handleInputChange} />
                            </AccountInfo>
                        </div>

                        <Question>
                            <label htmlFor="age">How old are you? </label>
                            <div>
                                <input className='age' type="age" name="age" id="age" maxLength="2" value={formData.age} onChange={handleInputChange} />
                                <span>years</span>
                            </div>
                        </Question>

                        <Question>
                            <label htmlFor="gender">What is your gender?</label>
                            <select name="gender" id="gender" onChange={handleInputChange}>
                                    <option value="">Select an option</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="nobinary">No Binary</option>
                                    <option value="other">Other</option>
                                    <option value="noanswer">I prefer not to answer</option>
                            </select>
                        </Question>

                        <Question>
                            <label>Do you have any allergies?</label>
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
                            <label>Do you take medication on a regular basis?</label>
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
                            <label>Are you overweight or obese?</label>
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
                            <label>Do you have hypertension?</label>
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
                            <label>Do you have hight cholesterol?</label>
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
                            <label>Do you have diabetes?</label>
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
                            <label>Have you smoked cigarettes for at least 10 years?</label>
                            <div>
                                <input type="radio" className='radio' id="smokeyes" name="smoke" value="yes" onChange={handleInputChange} />
                                <label htmlFor="smokeyes">Yes</label>

                                <input type="radio" className='radio' id="smokeno" name="smoke" value="no" onChange={handleInputChange} />
                                <label htmlFor="smokeno">No</label>
                            
                                <input type="radio" className='radio' id="smokeunknown" name="smoke" value="unknown" onChange={handleInputChange} />
                                <label htmlFor="smokeunknown">I don't know</label>
                            </div>
                        </Question>

                        <Question>
                            <label>Have you recently suffered an injury or an operation?</label>
                            <div>
                                <input type="radio" className='radio' id="injuryyes" name="injury" value="yes" onChange={handleInputChange} />
                                <label htmlFor="injuryyes">Yes</label>

                                <input type="radio" className='radio' id="injuryno" name="injury" value="no" onChange={handleInputChange} />
                                <label htmlFor="injuryno">No</label>
                            
                                <input type="radio" className='radio' id="injuryunknown" name="injury" value="unknown" onChange={handleInputChange} />
                                <label htmlFor="injuryunknown">I don't know</label>
                            </div>
                        </Question>

                        <Question>
                            <label>Are you pregnant?</label>
                            <div>
                                <input type="radio" className='radio' id="pregnantyes" name="pregnant" value="yes" onChange={handleInputChange} />
                                <label htmlFor="pregnantyes">Yes</label>

                                <input type="radio" className='radio' id="pregnantno" name="pregnant" value="no" onChange={handleInputChange} />
                                <label htmlFor="pregnantno">No</label>
                            
                                <input type="radio" className='radio' id="pregnantunknown" name="pregnant" value="unknown" onChange={handleInputChange} />
                                <label htmlFor="pregnantunknown">I don't know</label>
                            </div>
                        </Question>

                    </div>   

                    <div>
                        <button type="submit">Update</button>
                    </div>
                </form>
            </Content>
        </Container >
    )
};

const Container = styled.div`
    width: 100vw;
    display: flex;
    gap: 260px;
`;

const Content = styled.div`
    display: flex;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 20px;
    width: 60vw;
    gap: 10%;

    & form {
        background-color: transparent;
    }
`;

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
    }
`;

export default UpdateAccount;