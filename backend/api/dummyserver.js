const express = require('express');
const app = express();

app.get('/',(req,res)=>{
    res.send("dummy server");
});

module.exports = app;