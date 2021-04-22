console.log("Starting...");
console.log("Test1");

const http = require('http');
const express = require('express');
const port = 8451;
var app = express();
var appLocal = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

appLocal.use(express.urlencoded({ extended: false }));
appLocal.use(express.json());

var success, time;

appLocal.post('/setData', (req, res) =>{
    console.log("Get Data: " + req.body.success + " Time: " + req.body.Time);
    // success = req.body.success;
    success = req.body.success;
    if(success == "true"){
        time = new Date();
    }
    res.send("Thanks for the Data");
})

app.get('/API', (req, res) =>{
    res.send("Last success at: " + time);
})


var httpServer = http.createServer(app);
httpServer.listen(port);
console.log("Server gestartet");
console.log("Port: " + port);

var httpServerLocal = http.createServer(appLocal);
httpServerLocal.listen(8452);
console.log("Local Server startet on Port 8452");