const jsonwebtoken = require('jsonwebtoken')
const config = require('../../config');
const bcrypt = require('bcrypt')


const comparePassword = (argsPassword,userPassword,userEmail,userId) => {
    
    
        return  bcrypt.compare(argsPassword, userPassword)
        .then((compare) => {
        if(compare) 
        {
           
            const token = jsonwebtoken.sign({id: userId,email:userEmail}, config.jwt.secret, { expiresIn: '1y' })
            return token  
            
        }    
            return compare
    
       })
       .catch(err => {

            return err
            
            /* err will be equal to error on line 4*/
        })
    
    }
    
   


module.exports = comparePassword