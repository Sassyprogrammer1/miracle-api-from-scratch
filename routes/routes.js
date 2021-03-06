const course = require('../controller/course');
const loginCon = require('../controller/loginCon');
const role = require('../controller/role');
const userReg = require('../controller/userRegister');
const assignmentCon = require('../controller/createAssignmentCon');
const viewAssignmentsCon = require('../controller/viewAssignmentsCon');
const readUserCon = require('../controller/readUserCon');

const initendpoints = (app) => {
    app.get('/',(req,res)=>{
        res.send("Api is working!");
    });

    app.use('/api/',readUserCon);
    app.use('/api/',viewAssignmentsCon);
    app.use('/api/',assignmentCon);
    app.use('/api/',userReg);
    app.use('/api/',loginCon);
    app.use('/api/',course);
    app.use('/api/',role);
}

module.exports = initendpoints;