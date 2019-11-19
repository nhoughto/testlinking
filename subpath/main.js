var assert = require('chai.js').assert;

Sandbox.define("/hey", function(req,res){
    try {
        assert.equal(req.query.value, 'correct');
    } catch(e){
        return res.json(400, {error:e.message});
    }
    res.send('success2');
})
