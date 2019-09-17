const express = require("express");                                   // load the express library
const app = express();                                                // let app is equal to running the express function.

app.use(express.json());                                              // allow application to accept json

const users = [{ name: "John Smith"}];                                 // Users as a local variable (which would normally be in a database but this is for the study)

app.get('/users', function(req, res) {                                // create a route to get users
    res.json(users);                                                  // send response of users as a json object
});

app.post('/users', function(req, res) {                                 // when the client posts by submitting a user name a passord...
    const user = { name: req.body.name, password: req.body.password}    // the variable user comprised of the name and the password...
    users.push(user);                                                   // push the user into the users variable...
    res.status(201).send();                                             // and return a 201 status code and a blank response to the user.
});

app.listen(3000, function() {                                         //  listen on port 3000...
    console.log('You app is listening on port 3000...');
})