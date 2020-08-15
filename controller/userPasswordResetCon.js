const db = require('../DB/connection');
const nodemailer = require('nodemailer');
const config = require('../config');
const validatePassword = require('../utils/common/validatePassword');
const bcrypt = require('bcrypt');


const userPasswordResetController = {

    resetPasswordVerify(args){

        var arr = [];
        let email = args.email;
        var mailOptions,link,responseObject;

        return (async()=>{

            try{

                const smtpTransport = await nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    port: 465,
                    secure: true, // upgrade later with STARTTLS
                    auth: {
                      user: config.mailer.authUser, // Enter your email here
                      pass: config.mailer.authPass, // Enter your password here
                    },
                  });

                const beforeSnapshot =  db.ref('/users').orderByChild("email").equalTo(`${email}`);
                const snapshot = await beforeSnapshot.once("value");
                var stringifiedSnapshot = JSON.stringify(snapshot)
                var afterSnapshot = JSON.parse(stringifiedSnapshot);

                if(afterSnapshot!==null)
                {
                    for(var x in afterSnapshot)
                    {
                        arr.push(x);
                    }
            
                    link = `${config.host.local}`+`/api/verify/passwordreset?id=${arr[0]}`;
                    mailOptions = {
                        to: email,
                        subject: "Password reset confirmation!",
                        html: "Hello,<br> Please Click on the link to reset your pasword.<br><a href="+link +">Click here to reset</a>",
                    };
        
                   const trasportObj = await smtpTransport.sendMail(mailOptions)

                   if(trasportObj.accepted.length>0)
                   {
                    responseObject = {

                        response:{message:"please click on the link send to your email to reset password!",status:200}
                    }
                    return responseObject
                   }
                   else
                   {
                    responseObject = {

                        response:{message:"inter server error",status:500}
                    }
                    return responseObject
                   }
                }
                else
                {
                    responseObject = {

                        response:{message:"please enter a valid email address!",status:401}
                    }
                    return responseObject
                }
            }
            catch(error)
            {
                responseObject = {

                    response:{response:{"errorMessage":"internal server error!","status":500}}
                }
                return responseObject
            }

        })();

    },

    updatePassword(args){
        
        return (async()=>{
            try{
                var responseObject;
                userId = args.userId;
                newPassword = args.newPassword;
                confiremPassword = args.confirmPassword;
                const beforeSnapshot = db.ref('/users').child(`${userId}`);
                const snapshot = await beforeSnapshot.once("value");
                var stringifiedSnapshot = JSON.stringify(snapshot)
                var afterSnapshot = JSON.parse(stringifiedSnapshot);
                if(afterSnapshot!==null){
                    if(newPassword.length<14){
                        if(validatePassword(newPassword) === true){   
                            if(confiremPassword === newPassword){  
                                newPassword = bcrypt.hashSync(newPassword, 10);
                                var documentRef = `users/${userId}`
                                const update  = await db.ref(documentRef).update({password: newPassword})
                                responseObject = {

                                    response:{response:{"message":"password sucessfully changed!","status":200}}
                                }
                                
                            }
                            else
                            {
                                responseObject = {

                                    response:{response:{"message":"Passwords did not match!","status":401}}
                                }
                                
                            }
                                    
                        }
                        else
                        {    
                            
                            responseObject = {

                                response:{response:{"message":"your password should be 8-13 characters with numbers,special characters, lower and uppercase letters!","status":401}}
                            }
                            
                            
                        }
                    } 
                    else
                    {
                        responseObject = {

                            response:{response:{"message":"your password should be 8-13 characters with numbers,special characters, lower and uppercase letters!","status":401}}
                        }
                        
                    }
                   
                }
                else
                {
                    responseObject = {

                        response:{response:{"message":"please enter a valid userId","status":401}}
                    }
                    
                }
                return responseObject
            }
            catch(error)
            {
                responseObject = {

                    response:{response:{"errorMessage":"internal server error!","status":500}}
                }
                return responseObject
            }
        })();
    }
}

module.exports = userPasswordResetController;