var assert = require('chai.js').assert;

Sandbox.define("/hey", function(req,res){
    res.send([
        "level" => "25"
    ]);
})
