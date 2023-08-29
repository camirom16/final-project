//MongoDb Setup
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const createAccount = async (req, res) => {
    //Extract the value of the form from the req.body
    const { account } = req.body;

    const client = new MongoClient(MONGO_URI, options);
    try {
        await client.connect();
        const db = client.db('infoHealth')
        console.log('connected to db');

        //Check if the email already exists in the accounts collection
        const existingAccount = await db.collection('accounts').findOne({ email: account.email });
        if (existingAccount) {
            return res.status(400).json({ status: 400, message: 'An account with this email already exists.' });
        }

        // Create the new document in the account collection
        const accountCreationResult = await db.collection('accounts').insertOne(account);

        // If it wasn't successful, sent back a 500 and prompt dev for next actions to take
        if (!accountCreationResult.acknowledged) {
            return res.status(500).json({ status: 500, message: "Something went wrong during the order creation. Try again" })
        }
            // If the creation of the account in accounts collectionis successful, send Success message and return the account.
        return res.status(201).json({ status: 201, message: "Account successfully created!", data: account })
    }
    // Catch and log any dev or db errors and notify FE to look at BE console
    catch (err) {
        console.log("Error:", err)
        return res.status(500).json({ status: 500, message: "An error occured while creating the account. Verify server console." })
    }

    // Close connection to db
    finally {
        client.close()
        console.log('disconnected from db')
    }
}

module.exports = { createAccount }