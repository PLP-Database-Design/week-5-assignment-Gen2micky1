// Import some dependencies/ packages 

// HTTP framework for handling requests
const express = require('express');
//Instance of express framework
const app = express(); 
// DBMS Mysql 
const mysql = require('mysql2');
// Cross Origin Resourse Sharing 
const cors = require('cors');
// Environment variable doc 
const dotenv = require('dotenv');

// 
app.use(express.json());
app.use(cors());
dotenv.config(); 

// connection to the database 
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME 
});

// Check if there is a connection 
db.connect((err) => {
    // If no connection 
    if(err) return console.log("Error connecting to MYSQL");

    //If connect works successfully
    console.log("Connected to MYSQL as id: ", db.threadId); 
}) 


// < YOUR code goes down here 

// Question 1

app.get('/get-patients', (req, res) => {
    const getPatients = "SELECT * FROM patients"

    db.query(getPatients, (err, results) => {

        if(err) {
            return res.status(500).send("Failed to fetch the patients")
        }

        res.status(200).send(results);
    })
})

// Question 2

app.get('/get-providers', (req, res) => {
    const getPatients = "SELECT * FROM providers"

    db.query(getPatients, (err, results) => {

        if(err) {
            return res.status(500).send("Failed to fetch the patients")
        }

        res.status(200).send(results);
    })
})

// Question 3

app.get('/get-patients-first', (req, res) => {
    const getPatientsFirstName = "SELECT first_name FROM patients;"

    db.query(getPatientsFirstName, (err, results) => {

        if(err) {
            return res.status(500).send("Failed to fetch the patients first name")
        }

        res.status(200).send(results);
    })
})


// Question 4

app.get('', (req, res) => {
    const getProviderSpecialty = "SELECT provider_specialty FROM providers;"

    db.query(getProviderSpecialty, (err, results) => {

        if(err) {
            return res.status(500).send("Failed to fetch the provider specialty")
        }

        res.status(200).send(results);
    })
})







// Start the server 
app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);

    // Sending a message to the browser 
    console.log('Sending message to browser...');
    app.get('/', (req,res) => {
        res.send('Server Started Successfully!');
    });

});