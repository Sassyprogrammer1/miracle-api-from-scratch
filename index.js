const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes/routes');

app.options('*', cors())
app.use(function(req, res, next) {
 	res.header("Access-Control-Allow-Origin", "*");
 	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
 });
app.use(bodyParser.json({limit: '5mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));
routes(app);

 



 var PORT = 8080;

app.listen(PORT,(req,res)=>{
    console.log(`port is listening on PORT ${PORT}`);
})
