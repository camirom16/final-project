const { v4: uuidv4 } = require("uuid");
const bcrypt = require('bcrypt');
const axios = require('axios');

//MongoDb Setup
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI, API_KEY } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

//HANDLER TO GET THE ACCOUNT BY THE ID
const getAccount = async (req, res) => {
    const { accountId } = req.params;

    const client = new MongoClient(MONGO_URI, options);
    try {
        await client.connect();
        const db = client.db('infoHealth');

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
    }
}

//HANDLER TO CREATE A NEW ACCOUNT
const createAccount = async (req, res) => {
    //Extract the account data from the req.body
    const account = req.body.account;

    //Generate a custom id
    const accountId = uuidv4();

    const client = new MongoClient(MONGO_URI, options);
    try {
        await client.connect();
        const db = client.db('infoHealth')

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

        // Insert the new document into the account collection
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
    }
}

//HANDLER TO SIGNIN BY EMAIL AND PASSWORD
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const client = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();
        const db = client.db('infoHealth');

        //Find the account using the provided email
        const account = await db.collection('accounts').findOne({ email });
        if (!account) {
            return res.status(404).json({ status: 404, message: 'Account not found. Please create a new account.' });
        }

        //Compare the hashed password with the provided password
        const passwordMatch = await bcrypt.compare(password, account.password);

        if (!passwordMatch) {
            return res.status(401).json({ status: 401, message: 'Incorrect password. Please try again.' });
        }

        //Account info successful
        return res.status(200).json({ status: 200, message: 'Login successful', data: account });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ status: 500, message: 'An error occurred while loggin in. Verify server.' });
    }
    finally {
        client.close();
    }
}

//HANDLER TO UPDATE USER'S MEDICAL INFORMATION OR PASSWORD
const updateAccount = async (req, res) => {
    const { accountId } = req.params;
    const { fieldsToUpdate } = req.body;

    const client = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();
        const db = client.db('infoHealth');

        // Check if the fieldsToUpdate object contains the 'password' field
        if ('password' in fieldsToUpdate) {
            // Handle password update
            const hashedPassword = await bcrypt.hash(fieldsToUpdate.password, 10);
            const updateResult = await db.collection('accounts').updateOne(
                { _id: accountId },
                { $set: { password: hashedPassword } }
            );

            if (updateResult.modifiedCount === 0) {
                return res.status(404).json({ status: 404, message: 'Account not found. Cannot update.' });
            }
            return res.status(200).json({ status: 200, message: 'Password updated successfully' });
        } 
        else {
            // Handle medical information update
            const updateObject = {};
            for (const field in fieldsToUpdate) {
                updateObject[`medicalInfo.${field}`] = fieldsToUpdate[field];
            }

            const updateResult = await db.collection('accounts').updateOne(
                { _id: accountId },
                { $set: updateObject }
            );

            if (updateResult.modifiedCount === 0) {
                return res.status(404).json({ status: 404, message: 'Account not found. Cannot update.' });
            }
            return res.status(200).json({ status: 200, message: 'Account information updated successfully' });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ status: 500, message: 'An error occurred while updating account information. Verify server.' });
    } finally {
        client.close();
    }
};

//HANDLER TO DELETE THE USER'S ACCOUNT
const deleteAccount = async (req, res) => {
    const { accountId } = req.params;

    const client = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();
        const db = client.db('infoHealth');
        console.log('connected');

        // Check if the account exists
        const existingAccount = await db.collection('accounts').findOne({ _id: accountId });

        if (!existingAccount) {
            return res.status(404).json({ status: 404, message: 'Account not found.' });
        }

        //Delete the account
        const deleteResult = await db.collection('accounts').deleteOne({ _id: accountId });

        if (deleteResult.deletedCount === 1) {
            return res.status(200).json({ status: 200, message: 'Account deleted successfully' });
        } else {
            return res.status(500).json({ status: 500, message: 'Failed to delete account. Try again later.' });
        }
    } 
    catch (err) {
        console.log(err);
        return res.status(500).json({ status: 500, message: 'An error occurred while deleting account information. Verify server.' });
    } 
    finally {
        client.close();
    }
};

//TO FETCH SYMPTOM INFORMATION FROM NHS API
const fetchSymptomInfo = async (symptom) => {
    const url = `https://api.nhs.uk/conditions/${symptom}`;
    const headers = {
        'subscription-key': API_KEY,
    };

    try {
        const response = await axios.get(url, { headers });
        return response.data;
    } catch (error) {
        console.error('Error fetching symptom information from NHS API:', error);
        throw error;
    }
};

// Handler to get symptom information
const getSymptomInfo = async (req, res) => {
    const { symptom } = req.params;

    try {
        const symptomInfo = await fetchSymptomInfo(symptom);
        res.status(200).json({ status: 200, data: symptomInfo });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error fetching symptom information' });
    }
};

module.exports = { getAccount, createAccount, loginUser, updateAccount, deleteAccount, getSymptomInfo };