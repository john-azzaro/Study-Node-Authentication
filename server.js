const express = require("express");               // load the express library
const app = express();                            // load express app

app.listen(3000, function() {                                       //  listen on port 3000...
    console.log('You app is listening on port 3000...');
})