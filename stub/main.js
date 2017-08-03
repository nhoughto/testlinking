/**
* My API Sandbox
* 
*/

var blah = 11;
var route1 = require('./routes/route1');

Sandbox.define('/hello/{q}', function(req, res){
    console.log("q: " + req.params.q)
    res.header('Cache-Control', 'max-age=300')
    res.send(req.params.q)
    
})
 
Sandbox.define('/hello', function(req, res){
    if(req.query.wsdl != undefined){
        return res.render("wsdl")
    }
    res.set('Location', "https://google.com")
    res.send(302)
})

Sandbox.define('/hello5', function(req, res){
 res.send(Sandbox.config.msg)
})

Sandbox.define('/Authentication.ApiService/ValidateToken', function(req, res){
 res.send(200, "hello");
})

Sandbox.define('/ValidateToken', function(req, res){
 res.send(200, "hello");
})

Sandbox.define('/SomeFunction.OtherService/CreateToken', function(req, res){
 res.send(200, "hello");
})
 
Sandbox.define('/data', 'post', function(req, res){
    var fullUrl = "http://" + req.headers['Host'] + req.path;
    
    res.header('Location', fullUrl);
    res.send(302);
});

// A basic route returning a canned response
Sandbox.define('/authed4', 'get', function(req, res){
    console.log("test")
    
    var result = ""
    for (var x = 0; x < 15; x++) {
        result += "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890"
    }
    res.send(result);
});

Sandbox.soap('/helloWorldPT/','sayHello', function(req, res){
    // Check the request, make sure it is a compatible type, covers both SOAP 1.1 and 1.2
    if (!req.is('text/xml') && !req.is('application/xml') && !req.is('application/soap')) {
        return res.send(400, 'Invalid content type, expected application/soap+xml');
    }
    
    // Set the type of response, sets the content type.
    res.type('application/soap+xml');
    
    // Set the status code of the response.
    res.status(200);
    
    // Send the response body.
    res.render('SayHello');
})

Sandbox.define("/test", 'post', function(req, res) { 
    var result  = ""
    _.each(req.xmlDoc.find("//getQuantities"), function(item){
       result += item.get('inventoryItemName').text()
    })
    res.send(result) 
});
