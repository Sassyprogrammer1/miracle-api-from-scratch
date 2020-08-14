const express = require('express');
const app = express();

const bcrypt = require('bcrypt');

// //READ A USER
// app.get('/singleuser/:id', (req, res) => {
//     const user = db.user.findOne({where: {id:req.params.id}});
//     user.then(value=>{
//         if(value!==null)
//         {
//             res.status(200).json({"payload":value});
//         }
//         else
//         res.status(400).json({"message":"user does not exist"});
//     })
//     .catch(err=>{
//         res.status(404).json({"ERROR":err});
//     });
// });

// //READ ALL USERS
// app.get('/users', (req, res) => {
//     const user = db.user.findAll({});
//     user.then(value=>{
//         if(value.length!==0)
//         {
//             res.status(200).json({"payload":value[0]});
//         }
//         else
//         res.status(400).json({"Message":"no user exists!"});
//     })
//     .catch(err=>{
//         res.status(404).json({"ERROR":err});
//     });
// });

// //CREATE A USER
// app.post('/usersignup', (req, res) => {
//     let email = req.body.email;
//     if (validateEmail(email) === true) {
//         db.user.findOne({ where: { email: email } })
//             .then(val => {
//                 if (val === null) {
//                     let password = bcrypt.hashSync(req.body.password, 10);
//                     let user = db.user.create({ name: req.body.name, password: password, email: email, roleId: req.body.roleId });
//                     user.then(value => {
//                         console.log(value)
//                         res.status(200).json({ "payload": value });
//                     })
//                 }
//                 else
//                     res.status(400).json({ "message": "Email already exists!" });
//             })
//     }
//     else
//         res.status(400).json({ "message": "invalid email!" });

// });

// //USER LOGIN
// app.post('/userlogin', (req, res) => {
//     console.log();
//     const user = db.user.findOne({where:{email:req.body.email}});
//     user.then(value=>{
//         if(value!==null)
//         {   console.log(value.password)
//             const compare = comparePassword(req.body.password, value.password, value.email, value.id)
//             compare.then(value=>{
//                 if(value!==false)
//                 {
//                     res.status(200).json({"payload":value})
//                 }
//                 else
//                 {
//                     res.status(400).json({"Message":"incorrect password"})
//                 }
//             })
            
            
//         }
//         else
//         res.status(400).json({"message":"no user found!"});
//     })
//     .catch(err=>{
//         res.status(404).json({"Error":err});
//     })
// })

// //UPDATE A USER
// app.put('/updateuser/:id', (req, res) => {
//     console.log("you are almost there my boy!");
// });

// //REMOVE A USER
// app.delete('/removeuser/:id', (req, res) => {
//     console.log('come on my boy you almost there!');
// });


module.exports = app;