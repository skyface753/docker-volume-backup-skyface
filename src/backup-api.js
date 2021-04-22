console.log("Starting...");
console.log("Test1");

const http = require('http');
const express = require('express');
const port = 8451;
var app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.get('/test', (req, res) =>{
        console.log("Hello" + req.body)
        res.send("Zurück: " + req.body);

})


var httpServer = http.createServer(app);
httpServer.listen(port);
console.log("Server gestartet");
console.log("Port: " + port);