const express = require("express");
const morgan = require("morgan");

const { createAccount } = require('./handlers')

const PORT = 8000;

const app = express();
app.use(morgan("tiny"))
app.use(express.json())

//To create a new account
app.post('/account', createAccount)

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});