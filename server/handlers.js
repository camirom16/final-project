const { v4: uuidv4 } = require("uuid");
const bcrypt = require('bcrypt');

//MongoDb Setup
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

//Handler to get the new account
const getAccount = async (req, res) => {
    const { accountId } = req.params;

    const client = new MongoClient(MONGO_URI, options);
    try {
        await client.connect();
        const db = client.db('infoHealth');
        console.log('connected to db');

        //Find the account using the provides id
        const accountFound = await db.collection('accounts').findOne({ _id: accountId });

        if(!accountFound) {
            return res.status(404).json({ status: 404, accountId, message: 'Account not found' });
        }
            return res.status(200).json({ status: 200, message: 'Account found successfully', data: accountFound });
    }
    catch (err) {
        console.log('Error:', err);
        return res.status(500).json({ status: 500, message: "An error occured while retrieving the account. Verify server console." })
    }
    finally {
        client.close();
        console.log('disconnected from db');
    }
}

//Handler to create a new account
const createAccount = async (req, res) => {
    //Extract the account data from the req.body
    const account = req.body.account;

    //Generate a custom id
    const accountId = uuidv4();

    const client = new MongoClient(MONGO_URI, options);
    try {
        await client.connect();
        const db = client.db('infoHealth')
        console.log('connected to db');

        console.log('Account password:', account.password);

        //Hash the password
        const hashedPassword = await bcrypt.hash(account.password, 10);

        //Create the document to be inserted
        const accountDocument = {
            _id: accountId,
            name: account.name,
            email: account.email,
            password: hashedPassword,
            medicalInfo: {
                age: account.age,
                gender: account.gender,
                allergies: account.allergies,
                db: account.db,
                dlp: account.dlp,
                hta: account.hta,
                injury: account.injury,
                medication: account.medication,
                pregnant: account.pregnant,
                smoke: account.smoke,
                weight: account.weight,
            }
        };


        //Check if the email already exists in the accounts collection
        const existingAccount = await db.collection('accounts').findOne({ email: accountDocument.email  });
        if (existingAccount) {
            return res.status(400).json({ status: 400, message: 'An account with this email already exists.' });
        }

        // Inset the new document into the account collection
        const accountCreationResult = await db.collection('accounts').insertOne(accountDocument);

        // If it wasn't successful, sent back a 500 and prompt dev for next actions to take
        if (!accountCreationResult.acknowledged) {
            return res.status(500).json({ status: 500, message: "Something went wrong during the order creation. Try again" })
        }
            // If the creation of the account in accounts collectionis successful, send Success message and return the account.
            return res.status(201).json({ status: 201, message: 'Account successfully created!', data: { _id: accountId, name: account.name, email: account.email } });
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

module.exports = { getAccount, createAccount };