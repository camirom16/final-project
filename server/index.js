const express = require("express");
const morgan = require("morgan");

const { getAccount, createAccount, loginUser, updateAccount, deleteAccount, getSymptomInfo } = require('./handlers')

const PORT = 8000;

const app = express();
app.use(morgan("tiny"))
app.use(express.json())

//ACCOUNT
// To get an account
app.get('/account/:accountId', getAccount)
//To create a new account
app.post('/account', createAccount)

// To login the user
app.post('/login', loginUser)

//To update the user's medical information
app.patch('/account/:accountId', updateAccount)

//To delete the account
app.delete('/account/:accountId', deleteAccount)

//NHS API
app.get('/symptom/:symptom', getSymptomInfo);


app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});