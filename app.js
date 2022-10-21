const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { json } = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname));
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const email = req.body.email;
    
    const data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: first_name,
                LNAME: last_name
            } 
        }]
    }
    const jsonData = JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0/lists/50b5335165";

    const options = {
        method: "POST",
        auth: "aswin1:7ef6741e68c115b0048cf790827efbf8-us21"
    }

    const request = https.request(url, options, function(response) {
        if (response.statusCode === 200)
            // return res.redirect("success.html");
            res.sendFile(__dirname + "/success.html")
        else 
            // return res.redirect("failure.html")
            res.sendFile(__dirname + "/failure.html")
        response.on("data", function(data) {
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();
});

app.post("/failure", function(req, res) {
    res.redirect("/");
})


app.listen(process.env.PORT || 3000, function() {
    console.log("Server is running on port 3000");
});

// 7ef6741e68c115b0048cf790827efbf8-us21

// list id
// 50b5335165