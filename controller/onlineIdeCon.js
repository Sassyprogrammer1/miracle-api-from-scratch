const express = require('express');
const app = express();
const request = require('request');
const config = require('../config');
const db = require('../db/connection');

app.post('/asdas', (req,res) => {

    var responseObject;
    (async()=>{
        try{
            let assignmentName = req.body.name;
            let assignmentQuestion = req.body.question;
            let script = req.body.script;
        
            var assignmentObject = {
        
                name:assignmentName,
                question:assignmentQuestion,
                script:script
            }
        
        
            var program = {
                script : script,
                language: "java",
                versionIndex: "0",
                clientId:config.jdoodle.clientId,
                clientSecret:config.jdoodle.clientSecret
            };
            request({
                url:config.jdoodle.requestUrl,
                method: "POST",
                json: program
            },
            function (error, response, body) {
                if(error)
                {
                    console.log('error:', error);
                    res.send(error);
                    
                }
                else if(response)
                {
                    console.log('statusCode:', response && response.statusCode);
                    var insert = await db.ref('/assignments').push(assignmentObject);
                    responseObject = {
                        
                        response:{"message":"assignment published","document":insert,"status":200},
                    }
                }
                else if(body)
                {
                    console.log('body:', body);
                    res.send(body);
                }
             
               res.json(responseObject)
                
            });
        }
        catch(err)
        {

        }
    })()
  

})

module.exports = app
