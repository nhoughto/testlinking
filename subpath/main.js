var assert = require('chai.js').assert;

Sandbox.define("/hey", function(req,res){
  assert.equal(req.body, 'body value');
  res.send('hey2');
})
