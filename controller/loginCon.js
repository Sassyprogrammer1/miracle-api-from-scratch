const express = require('express');
const app = express();

const comparePassword = require('../utils/common/checkPassword');
const db = require('../db/connection');


    

app.post('/userLogin',(req,res)=>{

    let email = req.body.email;
    let password = req.body.password;
    var responseObject
    var arr = [];
    
    (async()=>{

        try{
        console.log(email)    
        const beforeSnapshot =  db.ref('/users').orderByChild("email").equalTo(`${email}`)
        const snapshot = await beforeSnapshot.once("value");
        var stringifiedSnapshot = JSON.stringify(snapshot)
        var afterSnapshot = JSON.parse(stringifiedSnapshot);
        if(afterSnapshot!==null)
        {
            for(var x in afterSnapshot)
            {
                arr.push(x)
            }
            const compare = await comparePassword(password,afterSnapshot[arr[0]].password,afterSnapshot[arr[0]].email,arr[0])
            if(compare!==false)
            {
                responseObject = {
                    
                    id:arr[0],
                    email:afterSnapshot[arr[0]].email,
                    password:afterSnapshot[arr[0]].password,
                    response: {status:200,token:compare,message:"Login Successful!"},
                    

                }
            }
            else
            {
                 
                responseObject = {
                    
                    response: {"message":"Enter a correct password!","status":401},

                }
                
            }
        }
        else
        {   
            responseObject = {
                    
                response: {"message":"Oops your email is not registered!","status":200},

            }
        }
         
        res.json(responseObject)
}
        catch(error)
        {
           res.json(error)
        }
    })()


})


module.exports = app;