const express = require('express');
const app = express();


//READ A SINGLE ROLE
app.get('/singlerole',(req,res)=>{
    console.log('asshole suck socks!');
});

//CREATE A ROLE
app.post('/addrole',(req,res)=>{
    console.log('come on man!');
});

//DELETE A ROLE
app.delete('/removerole',(req,res)=>{
    console.log('come on come on come on!!');
});

module.exports = app;