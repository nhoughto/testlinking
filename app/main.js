/***
* My API Sandbox
* 
*/


var blah = 17;
var route1 = require('./routes/route1');

Sandbox.define('/km/btr', function(req, res){
    var result = {
    	"name":"btr.place",
    	"saml_sso_endpoint":"https://adfs.npe.aptsc.zone/adfs/ls/",
    	"saml_issuer":"BtrPlaceKeymaster",
    	"keymaster_auth_endpoint":"https://km.btr.place/v1/auth",
    	"keymaster_bounce_endpoint":"https://km.btr.place/v1/bounce",
    	"windows_proxy_host_and_port":"proxy.ss.npe.aptsc.zone:3128",
    	"jumpbox_host":"jumpbox.btr.place",
    	"roles": {
    	    "developer": { "iam_role_arn": "aws:iam:1234:smth/blahablah", "saml_group_name": "gg_ddc_digitalid_developers", "ssh_extra_usernames":[] },
    	    "cloudengineer": { "iam_role_arn": "aws:iam:1234:smth/blahablah", "saml_group_name": "gg_ddc_digitalid_developers", "ssh_extra_usernames":["coreos", "ec2-user"] }
    	}
    }
    res.json(result)
})

Sandbox.define('/hello/{q}', function(req, res){
    console.log("q: " + req.params.q)
    res.header('Cache-Control', 'max-age=300')
    res.set('blah','9');
    res.send(req.params.q)
    
})
 
Sandbox.define('/hello', function(req, res){
    if(req.query.wsdl != undefined){
        return res.render("wsdl")
    }
    res.set('Location', "https://google.com")
    res.send(302)
})

Sandbox.define('/hello4', function(req, res){
    var response = "";
    for (var name in this.global) {
      response += name + "\n";
    }
     
    res.delay(10000)
    res.send(response);
})

Sandbox.define('/hello5', function(req, res){
 res.send(Sandbox.config.msg)
})

Sandbox.define('/hello5/{a}', function(req, res){
 res.send("hey")
})

Sandbox.define('/Authentication.ApiService/ValidateToken', function(req, res){
 res.send(400, "hello");
})

Sandbox.define('/ValidateToken', function(req, res){
 res.send(200, "hello2");
})

Sandbox.define('/SomeFunction.OtherService/CreateToken', function(req, res){
 res.send(200, "hello");
})
 
Sandbox.define('/data', 'post', function(req, res){
    console.log("body: " + req.body)
    res.send(200, '');
});

// A basic route returning a canned response
Sandbox.define('/authed4', 'get', function(req, res){
    console.log("1")
    
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