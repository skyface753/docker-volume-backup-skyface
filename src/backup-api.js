console.log("Starting...");
console.log("Test1");

const moment = require('moment'); //Current Time and Date
const http = require('http');
const express = require('express');
const bodyParser = require("body-parser")
const mysql = require('mysql');
const port = 8451;
var app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json())

var conPool = mysql.createPool({
    connectionLimit: 100,
    host: "db",
    user: "userBackupAPI",
    password: "C5VYP9K27OD0LAd",
    database: "BackupAPI",
})

app.get('/test', (req, res) =>{
        console.log("Hello")
        res.send("Hallo");
})


var httpServer = http.createServer(app);
httpServer.listen(port);
console.log("Server gestartet");
console.log("Port: " + port);

