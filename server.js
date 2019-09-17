const express = require("express");                                   // load the express library
const app = express();                                                // let app is equal to running the express function.
const bcrypt = require('bcrypt');

app.use(express.json());                                              // allow application to accept json

const users = [{ name: "John Smith"}];                                 // Users as a local variable (which would normally be in a database but this is for the study)

app.get('/users', function(req, res) {                                // create a route to get users
    res.json(users);                                                  // send response of users as a json object
});

app.post('/users', async function(req, res) {                                 // when the client posts by submitting a user name a password...and add an "async" modifer for bcrypt for security
    try {
        const salt = await bcrypt.genSalt();                                  // generate a salt and save as the variable "salt".  10 is the default (i.e. left blank) but avoid higher numbers.
        const hashedPassword = await bcrypt.hash(req.body.password, salt);    // Then hash the password
        console.log(salt);
        console.log(hashedPassword);
        const user = { name: req.body.name, password: hashedPassword}          // the variable user comprised of the name and the password...
        users.push(user);                                                      // push the user into the users variable...
        res.status(201).send();                                                // and return a 201 status code and a blank response to the user.
    } catch(error) {
        res.status(500).send();
    }
});
 
app.post('/users/login', async function(req, res) {                            // To do login, set route to users/login and use an async function (since bcrypt is an async library)
    const user = users.find(user => user.name === req.body.name)               // find the user...
    if (user === null) {                                                       // if the user does NOT exist...
        return res.status(400).send('Cannot find user...');                    //  return an error status code and error message.
    }
    try {                                                                      // next setup a try/catch block where we will do the comparison for the user.
        if (await bcrypt.compare(req.body.password, user.password)) {          // use the compare method for bcrypt and pass in the intial password, then the hashed password from "user"
            res.send('Login Successful')                                       // and if the two are the same, the response will send successfully. 
        } else {                                                               // And if the login was not correct...
            res.send('Login failed')                                           // send a login failed message.
        }             
    } catch (error) {                                                          // and if there is an error, send 500 status code.
        res.status(500).send();
    }

});

app.listen(3000, function() {                                         //  listen on port 3000...
    console.log('You app is listening on port 3000...');
})