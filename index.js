const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes/routes');


app.use(bodyParser.json({limit: '5mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));
routes(app);
app.use(cors());




// var PORT = env.PORT;

app.listen(3000,(req,res)=>{
    console.log(`port is listening on PORT 3000!`);
})
