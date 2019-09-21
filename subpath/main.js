Sandbox.define("/hey", function(req,res) {
    res.send('hey')
    console.log("weird: " + JSON.stringify([
        "level" => "25"
    ]));
})
