const express = require('express');
const app = express();
const config = require('../config');
const date = require('../utils/common/datetime');
const db = require('../db/connection');


app.post('/createAssignment', (req,res)=>{

   
    var responseObject;
    (async()=>{
        try{
            
            let assignmentTitle = req.body.assignmentTitle;
            let assignmentQuestion = req.body.assignmentQuestion;     
            let createDate = date();
            let createdAt = createDate;
            let activationDate = req.body.activation;
            let expirationDate = req.body.expiration;
            
            var userobj = {assignmentTitle:assignmentTitle,assignmentQuestion:assignmentQuestion,activationDate:activationDate,expirationDate:expirationDate,createdAt:createdAt}
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