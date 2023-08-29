import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { COLORS } from "../styling/constants";

const NewAccount = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        age: '',
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
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const isStrongPassword = (password) => {
        //Password requirements
        const passwordPattern = /^(?=.*[A-Z])(?=.*[\W_])(?=.*[0-9]).{8,}$/;
        return passwordPattern.test(password);
    }

    const handleCreateAccount = (ev) => {
        ev.preventDefault();

        //Notify the user if the password is not as required
        if(!isStrongPassword(formData.password)) {
            alert("Password must be at least 8 characters long and include an uppercase letter, a symbol, and a number.");
            return;
        }

        //Notify the user if he's not older than 18 that he cannot create an account
        if (formData.age < 18) {
            alert("You must be at least 18 years old to create an account.");
            return;
        }
    
        // POST request to create a new account
            fetch('/account', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ account: formData }),
            })
                .then((response) => response.json())
                .then(data => {
                    if (data.status >= 400) {
                        alert(data.message)
                    }
                    else {
                        navigate(`/account/${data.data._id}`);
                    }
                })
                .catch((error) => console.log("Fetch error:", error.message));
    };

    return (
        <Container>

            <form onSubmit={(ev) => handleCreateAccount(ev)}>

                <div>
                    <h1>Create your account</h1>
                    <p>Please complete your profile before starting. It would only take a few minutes.</p>
                </div>
                
                <div> 
                    <div>
                        <AccountInfo>
                            <label htmlFor="name">What is your first name? </label>
                            <input type="text" name="name" id="name" value={formData.name} onChange={handleInputChange} required />
                        </AccountInfo>
                    
                        <AccountInfo>
                            <label htmlFor="email">What is your email? </label>
                            <input type="email" name="email" id="email" value={formData.email} onChange={handleInputChange} required />
                        </AccountInfo>

                        <AccountInfo>
                            <label htmlFor="password">Create a new password: </label>
                            <input type="password" name="password" id="password" value={formData.password} onChange={handleInputChange} required />
                        </AccountInfo>
                    </div>

                    <Question>
                        <label htmlFor="age">How old are you? </label>
                        <div>
                            <input className='age' type="age" name="age" id="age" maxLength="2" value={formData.age} onChange={handleInputChange} required />
                            <span>years</span>
                        </div>
                    </Question>

                    <Question>
                        <label htmlFor="gender">What is your gender?</label>
                        <select name="gender" id="gender" value={formData.gender} onChange={handleInputChange} required>
                                <option value="">Select an option</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="noanswer">I prefer not to answer</option>
                        </select>
                    </Question>

                    <Question>
                        <label>Do you have any allergies?</label>
                        <div>
                            <input type="radio" className='radio' id="allergiesyes" name="allergies" value="yes" required={true} onChange={handleInputChange} />
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
                            <input type="radio" className='radio' id="medicationyes" name="medication" value="yes" required={true} onChange={handleInputChange} />
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
                            <input type="radio" className='radio' id="weightyes" name="weight" value="yes" required={true} onChange={handleInputChange} />
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
                            <input type="radio" className='radio' id="htayes" name="hta" value="yes" required={true} onChange={handleInputChange} />
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
                            <input type="radio" className='radio' id="dlpyes" name="dlp" value="yes" required={true} onChange={handleInputChange} />
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
                            <input type="radio" className='radio' id="dbyes" name="db" value="yes" required={true} onChange={handleInputChange} />
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
                            <input type="radio" className='radio' id="smokeyes" name="smoke" value="yes" required={true} onChange={handleInputChange} />
                            <label htmlFor="smokeyes">Yes</label>

                            <input type="radio" className='radio' id="smokeno" name="smoke" value="no" checked={formData.smoke === "no"} onChange={handleInputChange} />
                            <label htmlFor="smokeno">No</label>
                        
                            <input type="radio" className='radio' id="smokeunknown" name="smoke" value="unknown" checked={formData.smoke === "unknown"} onChange={handleInputChange} />
                            <label htmlFor="smokeunknown">I don't know</label>
                        </div>
                    </Question>

                    <Question>
                        <label>Have you recently suffered an injury or an operation?</label>
                        <div>
                            <input type="radio" className='radio' id="injuryyes" name="injury" value="yes" required={true} onChange={handleInputChange} />
                            <label htmlFor="injuryyes">Yes</label>

                            <input type="radio" className='radio' id="injuryno" name="injury" value="no" checked={formData.injury === "no"} onChange={handleInputChange} />
                            <label htmlFor="injuryno">No</label>
                        
                            <input type="radio" className='radio' id="injuryunknown" name="injury" value="unknown" checked={formData.injury === "unknown"} onChange={handleInputChange} />
                            <label htmlFor="injuryunknown">I don't know</label>
                        </div>
                    </Question>

                    <Question>
                        <label>Are you pregnant?</label>
                        <div>
                            <input type="radio" className='radio' id="pregnantyes" name="pregnant" value="yes" required={true} onChange={handleInputChange} />
                            <label htmlFor="pregnantyes">Yes</label>

                            <input type="radio" className='radio' id="pregnantno" name="pregnant" value="no" checked={formData.pregnant === "no"} onChange={handleInputChange} />
                            <label htmlFor="pregnantno">No</label>
                        
                            <input type="radio" className='radio' id="pregnantunknown" name="pregnant" value="unknown" checked={formData.pregnant === "unknown"} onChange={handleInputChange} />
                            <label htmlFor="pregnantunknown">I don't know</label>
                        </div>
                    </Question>

                </div>   

                <div>
                    <button type="submit">Create account</button>
                    <p> By signin up, you agree to InfoHealth's  
                        <LoginLink to=''> Term of use </LoginLink>
                        and
                        <LoginLink to=''> Privacy policy.</LoginLink>
                    </p>
                </div>
            </form>
        </Container >
    )
};

const Container = styled.div`
    height: 66vh;
    display: flex;
    justify-content: center;

    & p {
        margin-bottom: 15px;
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

const LoginLink = styled(Link)`
    text-decoration: none;
    color: ${COLORS.links};
`;

export default NewAccount;