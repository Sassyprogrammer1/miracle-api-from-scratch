const express = require('express');
const app = express();
const config = require('../config');
const date = require('../utils/common/datetime');
const db = require('../db/connection');

app.get('/getUser/:id',(req,res)=>{
    (async()=>{
        try{
            let id = req.params.id;
            const snapshot =  db.ref('/users').child(`${id}`)
            const newSnapshot = await snapshot.once("value");
            var stringifiedSnapshot = JSON.stringify(snapshot)
            var afterSnapshot = JSON.parse(stringifiedSnapshot);
            console.log(afterSnapshot);
            res.send(newSnapshot)
        }
        catch(err)
        {
            console.log(err);
        }
    })();
})

module.exports = app;