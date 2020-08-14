const express = require('express');
const app = express();
const db = require('../db/connection');
const validatePassword = require('../utils/common/validatePassword');
const validateEmail = require('../utils/common/checkEmail');
const bcrypt = require("bcrypt");



app.post('/userSignup', (req,res)=>{
    var responseObject;
    (async()=>{
        try{
            let email = req.body.email;
            let password = req.body.password;
            let reEnter = req.body.confirmPassword;
            if (validateEmail(email) === true){   

                const snapshot =  db.ref('/users').orderByChild("email").equalTo(`${email}`)
                const newSnapshot = await snapshot.once("value");
                var stringifiedSnapshot = JSON.stringify(newSnapshot)
                var afterSnapshot = JSON.parse(stringifiedSnapshot);
                if (afterSnapshot===null){
                    if(validatePassword(password)===true){  
                        if(password.length<14){
                            if(reEnter === password)
                            {
                                password = bcrypt.hashSync(password, 10);
                                var userobj = {email:email, password:password}
                                var insert = await db.ref('/users').push(userobj);
                                responseObject = {
                                email:email,
                                password:password,
                                response:{"message":"Congratulations account registered!","document":insert,"status":200},
                                }
                                

                            }
                            else
                            {
                                 responseObject = {

                                    response:{"message":"passswords didnot match!","status":401}

                                }
                            }
                                            
                        }
                        else
                        {
                            responseObject = {response:{"message":"your password should be 8-13 characters with numbers,special characters, lower and uppercase letters!","status":401}};
                            
                        }
                        
                    }
                    else
                    {    
                        responseObject = {response:{"message":"your password should be 8-13 charas,special characters, lower and uppercase letters!cters with number","status":401}};
             
                    } 
                }
                else
                {

                    responseObject = {
                        response: {status:200,message:"this account is already registered, please choose another one!"},
                        email:email,
                    }
                    
                }
            }
            else{

                responseObject = {
                    response:{message:"please enter a valid emial address!",
                    status:401}
                }
                
            }
            res.json(responseObject);    


        }
        catch(err)
        {
            res.send(err)
        }
    })()


})


module.exports = app;