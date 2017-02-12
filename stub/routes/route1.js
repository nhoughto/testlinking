var route2 = require('./route2');

exports.something = function(req, res){
    route2.deeper(req, res);
}