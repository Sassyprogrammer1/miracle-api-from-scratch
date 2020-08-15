const express = require('express');
const app = express();


//This method will return the userId against which the password will be updated.
app.get("/verify/passwordreset",(req,res)=>{

  
    res.send(`<p>This is your user id, PLease update password!</p><h1>${req.query.id}</h1>`);
    
})


module.exports = app;