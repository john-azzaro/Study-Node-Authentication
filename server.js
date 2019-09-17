const express = require("express");                                   // load the express library
const app = express();                                                // let app is equal to running the express function.

const users = [{ name: "John Smith"}];                                 // Users as a local variable (which would normally be in a database but this is for the study)

app.get('/users', function(req, res) {                                // create a route to get users
    res.json(users);                                                  // send response of users as a json object
});

app.post('/users', function(req, res) {

});

app.listen(3000, function() {                                         //  listen on port 3000...
    console.log('You app is listening on port 3000...');
})