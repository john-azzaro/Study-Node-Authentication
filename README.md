# Node Authentication and Encryption Study

<br>

## What is the Node Authentication and Encryption Study?
The Node Authentication and Encryption Study is an examination of security and data confidentiality using the bcrypt encryption library. In this study, a basic express application
demonstrates how to post a user name and password to a locally stored user database, login with a user name and password, and show how bcrypt helps add a high level of security to the
authentication process.

<br>

## Study Contents:

* [What is Node Authentication and Encryption?](#)

<br>

## What is Authentication?
It should be understood first that passwords should never be stored as plain text in a database (or anywhere else for that matter). For securoty purposes, we use for identifying users and providing different access to content depending on their id and thus keep those passwords safe. For example, suppose you have a commerce website that requires users to register and sign into an an account to purchase items. The application would provide a registration and login form with credentials such as a name and password to verify that the user is who they say they are.


<br>

## What is bcrypt
Bcrypt is a *cryptographic hash function* which takes a piece of information and returns a string representing this information. The bcrypt library helps ass additional security to information by obscuring sensitive information by *hashing* and *salting* that information. So in other words, when we *hash* a password we encrypt it in code that cannot be easily decoded.  However, we can also *salt* a password, which is essentially insert random data in the input for the hash function for additional security.  For example, suppose we have a user name and password:
```
    {
        name: Joe Smith
        password: Abc123
    }
```
When you *salt* and *hash* the password, you will end up with something like this:
```
    {
        name: Joe Smith
        password: $2b$10$v.djtI71AcqSPn75sZHTOOyyviecbsQG9ZxcVcIwc9xsfxYvJGhle
    }
```

<br>

## How do you implement bcrypt in your authentication?
In this example, we want to secure the password of any user that sends in a POST to our database by hashing and salting the password to store in our database. 

#### STEP 1: Add the "bcrypt" dependency and require it:
```JavaScript
    const bcrypt = require('bcrypt');
```

#### STEP 2: Add "async" to your POST request
Because bcrypt is an asynchronous library, you need to make the POST request an async/await function.
```JavaScript
        app.post('/users', async function(req, res) {                              <== add async modifier
        const user = { name: req.body.name, password: req.body.password}
        users.push(user);
        res.status(201).send();
    });
```

#### STEP 3: 






