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

var success, date;

appLocal.post('/setData', (req, res) =>{
    success = req.body.success;
    if(success == "true"){
        date = new Date();
    }
    res.send("Thanks for the Data");
})

app.get('/API', (req, res) =>{
    var tempDate = new Date();
    tempDate.setDate(tempDate.getDate() - 1);
    console.log("Api Requested");
    if( typeof date == 'undefined' || !date){
        res.send("No Backup taken since Container is running")
        return;
    }
    if(date.getDate() >= tempDate.getDate() ){
        var output = {
            status: true,
            datum: date
        }
        res.send(output)
    }else{
        var output = {
            status: false,
            datum: date
        }
        res.send(output)
    }
})


var httpServer = http.createServer(app);
httpServer.listen(port);
console.log("Server gestartet");
console.log("Port: " + port);

var httpServerLocal = http.createServer(appLocal);
httpServerLocal.listen(8452);
console.log("Local Server startet on Port 8452");