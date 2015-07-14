/**
 * My API Sandbox
 * 
 */

// A basic route returning a canned response
Sandbox.define('/hello', 'get', function(req, res) {
    // send 'Hello world' response
    res.send('Hello world');
});
