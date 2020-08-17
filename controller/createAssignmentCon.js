const express = require('express');
const app = express();
const config = require('../config');
const date = require('../utils/common/datetime');
const db = require('../db/connection');


app.post('/createAssignment', (req,res)=>{

   
    var responseObject;
    (async()=>{
        try{
            
            let assignmentName = req.body.name;
            let assignmentQuestion = req.body.question; 
            let userId = req.body.id;    
            let createDate = date();
            let createdAt = createDate;
            let activationDate = req.body.activation;
            let expirationDate = req.body.expiration;
            

            var userobj = {assignmentName:assignmentName,assignmentQuestion:assignmentQuestion,userId:userId,activationDate:activationDate,expirationDate:expirationDate,createdAt:createdAt}
            var insert = await db.ref('/assignments').push(userobj);
            responseObject = {
                response:{"message":"Assignment published!","document":insert,"status":200},
                }
            res.json(responseObject)
            

        }
        catch(err)
        {
            console.log(err)
        }
    })()
})

module.exports = app;