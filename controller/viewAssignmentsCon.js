const express = require('express');
const app = express();
const config = require('../config');
const date = require('../utils/common/datetime');
const db = require('../db/connection');

app.get('/viewAssignments',(req,res)=>{
    
    var responseObject;
    var arr = [];
    var newArr = [];
    (async()=>{
        try{
            const snapshot =  db.ref('/assignments');
            const newSnapshot = await snapshot.once("value");
            var stringifiedSnapshot = JSON.stringify(newSnapshot)
            var afterSnapshot = JSON.parse(stringifiedSnapshot);
            if(afterSnapshot!==null)
            {
                for(var x in afterSnapshot)
                {
                    arr.push(x)
                }
                //console.log(arr);
                console.log(arr)
                arr.forEach(value=>{
                    
                    var obj = {
                        assignmentId:value,
                        activationDate:afterSnapshot[value].activationDate,
                        assignmentTitle:afterSnapshot[value].assignmentTitle,
                        assignmentQuestion:afterSnapshot[value].assignmentQuestion,
                        createdAt:afterSnapshot[value].createdAt,
                        expirationDate:afterSnapshot[value].expirationDate,
                        userId:afterSnapshot[value].userId
                    }
                    newArr.push(obj);
                })

                
            }
            else
            {   
                
                res.json({response:{"message":"there are no records to show!","status":200}});
                
            }
            //console.log(pareSnapshot); 
            

            res.send(newArr);
        }
        catch(err)
        {
            console.log(err)
        }
    })();
       
});

module.exports = app;