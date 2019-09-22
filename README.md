# Node Authentication and Encryption with Bcrypt Study

<br>

## What is the Node Authentication and Encryption with Bcrypt Study?
The Node Authentication and Encryption with Bcrypt Study is an examination of security and data confidentiality using the bcrypt encryption library. In this study, a basic express application
demonstrates how to post a user name and password to a locally stored user database, login with a user name and password, and show how bcrypt helps add a high level of security to the
authentication process.

<br>

## Study Contents:

* [What is Node Authentication and Encryption with Bcrypt?](#What-is-Node-Authentication-and-Encryption-with-Bcrypt)
* [What is Authentication?](#What-is-Authentication)
* [What is bcrypt?](#What-is-bcrypt)
* [How do you implement bcrypt in your authentication?](#How-do-you-implement-bcrypt-in-your-authentication)
* [Screenshots](#Screenshots)


<br>

## What is Authentication?
It should be understood first that passwords should never be stored as plain text in a database (or anywhere else for that matter). Identifying users and providing different access to content depending on their id keep those passwords safe. For example, suppose you have a commerce website that requires users to register and sign into an an account to purchase items. The application would provide a registration and login form with credentials such as a name and password to verify that the user is who they say they are.


<br>

## What is bcrypt
Bcrypt is a *cryptographic hash function* which takes a piece of information and returns a string representing this information. The bcrypt library helps ass additional security to information by obscuring sensitive information by *hashing* and *salting* that information. So in other words, when we *hash* a password we encrypt it in code that cannot be easily decoded.  However, we can also *salt* a password, which is essentially insert random data in the input for the hash function for additional security.  For example, suppose we have a user name and password:
```
    {
        name: Joe Smith
        password: Abc123
    }
```
When you *salt* and *hash* the password, you will end up with a hashed password and salt:
```
    {
        name: Joe Smith
        password: $2b$10$v.djtI71AcqSPn75sZHTOOyyviecbsQG9ZxcVcIwc9xsfxYvJGhle
    }
```

<br>

## How do you implement bcrypt in your authentication?
In this example, we want to secure the password of any user that sends in a POST to our database by hashing and salting the password to store in our database. 

### STEP 1: Add the "bcrypt" dependency and require it:
```JavaScript
    const bcrypt = require('bcrypt');
```

### STEP 2: Add "async" to your POST request
Because bcrypt is an asynchronous library, you need to make the POST request an async/await function.  The example below will send the user and password information to the storage variable in our server file unencrypted. We'll change this in a moment but this is what we start with.
```JavaScript
    app.post('/users', async function(req, res) {                                // add async modifier
        const user = { name: req.body.name, password: req.body.password}         // store inputs as "user"
        users.push(user);                                                        // and push the user to "users"
        res.status(201).send();                                                  // and send!
    });
```

### STEP 3: Create a try/catch block
Try/catch will try the code and execute if successful, but if not, the catch will send a 500 error code back.
```JavaScript
    app.post('/users', async function(req, res) {
        try {                                                                                // try
            const user = { name: req.body.name, password: req.body.password}
            users.push(user);
            res.status(201).send();
        } catch(error) {                                                                     // catch
            res.status(500).send();
        }
    });
```

### STEP 4: At the top of your try block, create a "salt"
To create a salt, you call bcrypt and use the method "genSalt" with any number you want( the larger the number, the longer it will take to generate the hash but the more secure it will be). 
It is best just to leave this empty. If you use a 10, it could do a few hashes, but 20 or 30 will take DAYS to generate so just dont do it.  And make sure make this an "await" since it is an asynchronous function.  
```JavaScript
    app.post('/users', async function(req, res) {
        try {
            const salt = await bcrypt.genSalt();                                          // salt added

            const user = { name: req.body.name, password: req.body.password}
            users.push(user);
            res.status(201).send();
        } catch(error) {
            res.status(500).send();
        }
    });
```
And if you log ```salt```, you will see generate a unique string, like the following:
```
    You app is listening on port 3000... 
    $2b$10$/tJcQTlBJAOoFnDKad3M6O                    <== salt
```

### STEP 5: Next, create a "hashed" password
Remember that when you create the hashedPassword, you need to pass that to the ```user``` variable.
```JavaScript
    app.post('/users', async function(req, res) {
        try {
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(req.body.password, salt);       // hashed password

            const user = { name: req.body.name, password: hashedPassword}            // and pass to user.
            users.push(user);
            res.status(201).send();
        } catch(error) {
            res.status(500).send();
        }
    });
```
And if you log ```hashedPassword```, you will see the salt and the hashed password.
```
    You app is listening on port 3000... 
    $2b$10$/tJcQTlBJAOoFnDKad3M6O                                         <== salt
    $2b$10$/tJcQTlBJAOoFnDKad3M6OQKkcOvoQPLo/iYEJLk.gaEvwhFXe39C          <== salt + hashed password
```

## Screenshots
![authentication1](https://user-images.githubusercontent.com/37447586/65382414-803c3280-dcb9-11e9-978b-0edd29fe16af.png)




