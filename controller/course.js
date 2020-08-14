const express = require('express');
const app = express();


//READ ALL COURSES
app.get('/allcourses',(req,res)=>{
    console.log("you are almost there!");
});

//READ A SINGLE COURSE
app.get('/singlecourse/:id',(req,res)=>{
    console.log("come on you fucking piece of shit!");
});

//ADD COURSES
app.post('/addcourse',(req,res)=>{
    console.log("come on you are almost there!");
});

//UPDATE A COURSE
app.put('/updatecourse/:id',(req,res)=>{
    console.log("come on you are almostfucking there!");
});

//REMOVE A COURSE
app.delete('/removecourse',(req,res)=>{
    console.log("come on man come on!");
});

module.exports = app;