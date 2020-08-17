require('dotenv').config();
const config = {
       
    host:{
            local:process.env.HOST_LOCAL,
            live:process.env.HOST_LIVE
        },

    jwt:{
            secret:process.env.JWT_SECRET
        },
    mailer:{
        authUser:process.env.MAILER_AUTH_USER,
        authPass:process.env.MAILER_AUTH_PASS
    },
    jdoodle:{
        requestUrl:process.env.JDOODLE_REQUEST_URL,
        clientId:process.env.JDOODLE_CLIENT_ID,
        clientSecret:process.env.JDOODLE_CLIENT_SECRET
    }    
      
}

module.exports = config;
