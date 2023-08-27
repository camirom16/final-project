import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const NewProfile = () => {
    const [age, setAge] = useState(18);
    const navigate = useNavigate();

    return (
        <Container>
            <LoginForm >
                <div>
                    <h1>Create your account</h1>
                    <p>Please complete your profile before starting. It would only take a few minutes.</p>
                </div>

                <Info>
                    <Question>
                        <label htmlFor='name'>What is your first name?</label>
                        <Input type='text' name='name' id='name' required/>
                    </Question>

                    <Question>
                        <label htmlFor='email'>Email</label>
                        <Input type='email' name='email' id='email' required />
                    </Question>

                    <Question>
                        <label htmlFor='password'>Create a new Password</label>
                        <Input type='password' name='password' id='password' required  />
                    </Question>

                    <Question>
                        <label htmlFor='age'>How old are you?</label>
                        <div>
                            <Input type='range' name='age' id='age' min='18' max='90' value={age} onChange={(e) => setAge(parseInt(e.target.value))} required />
                            <span>{age}</span>
                        </div>
                    </Question>

                    <Question>
                        <label>What is your gender</label>
                        <div>
                            <Select>
                                <option value="">-Choose an option-</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="noanswer">I prefer not to answer</option>
                            </Select>
                            
                        </div>
                    </Question>

                    <Question>
                        <label>Do you have any diagnosed health issues?</label>
                        <div>
                            <Input type='radio' name="diagnosis" /><Radio>Yes</Radio>
                            <Input type='radio' name="diagnosis" /><Radio>No</Radio>
                            <Input type='radio' name="diagnosis"/><Radio>I don't know</Radio>
                        </div>
                    </Question>

                    {/* <Question>
                        <label>Add each diagnosed health issue.</label><Input/>
                    </Question> */}

                    <Question>
                        <label>Do you have any known allergies or intolerances?</label>
                        <div>
                            <Input type='radio' name="allergies" /><Radio>Yes</Radio>
                            <Input type='radio' name="allergies" /><Radio>No</Radio>
                            <Input type='radio' name="allergies" /><Radio>I don't know</Radio>
                        </div>
                    </Question>

                    {/* <Question>
                        <label>Add each allergy and intolerance.</label><Input/>
                    </Question> */}

                    <Question>
                        <label>Do you take medication on a regular basis?</label>
                        <div>
                            <Input type='radio' name="medication" /><Radio>Yes</Radio>
                            <Input type='radio' name="medication" /><Radio>No</Radio>
                            <Input type='radio' name="medication" /><Radio>I don't know</Radio>
                        </div>
                    </Question>

                    {/* <Question>
                        <label>Add each medication and the dosage as indicated on the prescription or pharmacy box</label><Input/>
                    </Question> */}

                    <Question>
                        <label>I'm overweight or obese</label>
                        <div>
                            <Input type='radio' name="weight" /><Radio>Yes</Radio>
                            <Input type='radio' name="weight" /><Radio>No</Radio>
                            <Input type='radio' name="weight" /><Radio>I don't know</Radio>
                        </div>
                    </Question>

                    <Question>
                        <label>I have hypertension</label>
                        <div>
                            <Input type='radio' name="hta" /><Radio>Yes</Radio>
                            <Input type='radio' name="hta" /><Radio>No</Radio>
                            <Input type='radio' name="hta" /><Radio>I don't know</Radio>
                        </div>
                    </Question>

                    <Question>
                        <label>I have smoked cigarettes for at least 10 years</label>
                        <div>
                            <Input type='radio' name="smoke" /><Radio>Yes</Radio>
                            <Input type='radio' name="smoke" /><Radio>No</Radio>
                            <Input type='radio' name="smoke" /><Radio>I don't know</Radio>
                        </div>
                    </Question>

                    <Question>
                        <label>I've recently suffered an injury or an operation</label>
                        <div>
                            <Input type='radio' name="injury" /><Radio>Yes</Radio>
                            <Input type='radio' name="injury" /><Radio>No</Radio>
                            <Input type='radio' name="injury" /><Radio>I don't know</Radio>
                        </div>
                    </Question>

                    <Question>
                        <label>I have hight cholesterol</label>
                        <div>
                            <Input type='radio' name="dlp" /><Radio>Yes</Radio>
                            <Input type='radio' name="dlp" /><Radio>No</Radio>
                            <Input type='radio' name="dlp" /><Radio>I don't know</Radio>
                        </div>
                    </Question>

                    <Question>
                        <label>I'm pregnant</label>
                        <div>
                            <Input type='radio' name="pregnant" /><Radio>Yes</Radio>
                            <Input type='radio' name="pregnant" /><Radio>No</Radio>
                            <Input type='radio' name="pregnant" /><Radio>I don't know</Radio>
                        </div>
                    </Question>

                </Info>

                <div>
                    <Button type='submit' onClick={() => navigate("/profile/:profileId")}>Create my account</Button>
                    <p> By signin up, you agree to InfoHealth's  
                        <LoginLink to=''> Term of use </LoginLink>
                        and
                        <LoginLink to=''> Privacy policy.</LoginLink>
                    </p>
                </div>
            </LoginForm>
        </Container>
    )
};

const Radio = styled.label`
    padding: 0 15px 0 15px;
`

const Select = styled.select`
    width: 12vw;
    font-size: 1vw;
    border-radius: 20px;
    margin: 10px 0 20px 0;
    padding: 5px 15px;
`

const Container = styled.div`
    width: 100%;
    height: 66vh;
    display: flex;
    justify-content: center;
    align-items: center;
`

const LoginForm = styled.div`
    height: 63vh;
    width: 40vw;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #9287b9;
    border-radius: 30px;
    padding: 15px 30px 30px 30px;
    font-size: 0.9vw;
    text-align: center;
`

const Info = styled.div`
    display: flex;
    flex-direction: column;
`

const Question = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    & span {
        margin-left: 20px;
        font-size: 1vw;
        font-weight: bold;
        border: 1px solid black;
        border-radius: 100px;
        padding: 10px;
        background-color: white;
    }
`

const Input = styled.input`
    font-size: 1vw;
    border-radius: 20px;
    margin: 10px 0 20px 0;
    padding: 5px 15px;
`

const Button = styled.button`
    width: 15vw;
    font-size: 1vw;
    border: none;
    border-radius: 25px;
    background-color: #eb5154;
    color: white;
    font-weight: bold;
    padding: 20px 35px;
    margin-bottom: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    margin-right: 30px;
    cursor: pointer;

    &:hover {
        scale: 1.1;
    }
`

const LoginLink = styled(Link)`
    text-decoration: none;
    color: #432974;
`

export default NewProfile;