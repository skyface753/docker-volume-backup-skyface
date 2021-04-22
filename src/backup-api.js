console.log("Starting...");
console.log("Test1");

const http = require('http');
const express = require('express');
const port = 8451;
var app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

var success, time;

app.post('/test', (req, res) =>{
    console.log("Get Data: " + req.body.success + " Time: " + req.body.Time);
    success = req.body.success;
    time = req.body.time;
    res.send("Thanks for the Data");
})

app.get('test', (req, res) =>{
    res.send("Last Data: " + success + " at: " + time);
})


var httpServer = http.createServer(app);
httpServer.listen(port);
console.log("Server gestartet");
console.log("Port: " + port);