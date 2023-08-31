import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const Login = () => {
    const { accountId } = useParams();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleLogin = (ev) => {
        ev.preventDefault();

        // POST request login into the account
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ email, password }),
        })
            .then((response) => response.json())
            .then(data => {
                if (data.status >= 400) {
                    alert(data.message)
                }
                else {
                    navigate(`/profile/${data.data._id}`);
                }
            })
            .catch((error) => console.log(error.message));
};

    return (
        <Container>
            <LoginForm>
                <h1>Login</h1>

                <Info>
                    <label htmlFor='email'>Email</label>
                    <Input type='email' name='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label htmlFor='password'>Password</label>
                    <Input type='password' name='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </Info>


                <div>
                    {/* Enters to the user's profile */}
                    <Button onClick={handleLogin}>Login</Button>
                    <p> Not a member yet? 
                        <LoginLink to='/new-account'>Create your account now!</LoginLink>
                    </p>
                </div>
            </LoginForm>
        </Container>
    )
};

const Container = styled.div`
    width: 100%;
    height: 66vh;
    display: flex;
    justify-content: center;
    align-items: center;
`

const LoginForm = styled.div`
    height: 30vh;
    width: 30vw;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #9287b9;
    border-radius: 30px;
    padding: 30px;
    font-size: 1vw;
    text-align: center;
`

const Info = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Input = styled.input`
    width: 60%;
    font-size: 1vw;
    border-radius: 20px;
    margin: 10px 0 20px 0;
    padding: 5px 15px;
`

const Button = styled.button`
    width: 10vw;
    font-size: 1vw;
    border: none;
    border-radius: 25px;
    background-color: #eb5154;
    color: white;
    font-weight: bold;
    padding: 20px 35px;
    margin-bottom: 30px;
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

export default Login;