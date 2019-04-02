var assert = require('chai.js').assert;

Sandbox.define("/hey", function(req,res){
    try {
        assert.equal(req.body, 'body value');
    } catch(e){
        return res.send(400, e.message);
    }
    res.send('hey2');
})
