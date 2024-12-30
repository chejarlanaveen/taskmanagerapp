const express = require('express');
//const serverless = require('serverless-http');
const path = require('path');

const app = express();


const server1 = require(path.resolve(__dirname,'server1/server1.js'));
const server2 = require(path.resolve(__dirname,'server2'));

app.use('/server1',server1);
app.use('/server2',server2);

//module.exports = serverless(app);
//module.exports = app2;


//const serverless = require('serverless-http');




app.get('/check',(req,res)=>{

            res.status(200).send("server started !!");
        });

//app.listen(5000,console.log("server connected at 5000 port !!"));

//module.exports = serverless(app);
module.exports=app;