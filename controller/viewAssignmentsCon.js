const express = require('express');
const app = express();
const config = require('../config');
const date = require('../utils/common/datetime');
const db = require('../db/connection');

app.get('/viewAssignments',(req,res)=>{
    var arr = [];
    var newArr = [];
    (async()=>{
        try{
            const snapshot =  db.ref('/assignments');
            const newSnapshot = await snapshot.once("value");
            var stringifiedSnapshot = JSON.stringify(newSnapshot)
            var afterSnapshot = JSON.parse(stringifiedSnapshot);
            //console.log(pareSnapshot); 
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
                    assignmentName:afterSnapshot[value].assignmentName,
                    assignmentQuestion:afterSnapshot[value].assignmentQuestion,
                    createdAt:afterSnapshot[value].createdAt,
                    expirationDate:afterSnapshot[value].expirationDate,
                    userId:afterSnapshot[value].userId
                }
                newArr.push(obj);
            })

            res.send(newArr);
        }
        catch(err)
        {
            console.log(err)
        }
    })();
       
});

module.exports = app;