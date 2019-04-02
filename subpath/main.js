var chai = require('chai.js');

Sandbox.define("/hey", function(req,res){
  res.send('hey2');
})
