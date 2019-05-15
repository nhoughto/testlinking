/**
 * My API Sandbox
 *
 */

import { createUserHandler, getUsersHandler, getUserByUsernameHandler } from "users.mjs";


// A basic route returning a canned response
Sandbox.define('/hello3', 'get', function(req, res) {
    // send 'Hello world' response
    res.send('Hello world');
});

// Using stateful behaviour to simulate creating users
Sandbox.define('/users', 'POST', createUserHandler);

// Using stateful behaviour to simulate getting all users
Sandbox.define('/users', 'GET', getUsersHandler);

// Using named route parameters to simulate getting a specific user
Sandbox.define('/users/{username}', 'GET', getUserByUsernameHandler);
