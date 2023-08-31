const express = require("express");
const morgan = require("morgan");

const { getAccount, createAccount, loginUser, updateUser } = require('./handlers')

const PORT = 8000;

const app = express();
app.use(morgan("tiny"))
app.use(express.json())

//ACCOUNT
// To get an account
.get('/account/:accountId', getAccount)
//To create a new account
app.post('/account', createAccount)

// To login the user
app.post('/login', loginUser)

//To update the user's medical information
app.put('/account/:accountId/update', updateUser)

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});