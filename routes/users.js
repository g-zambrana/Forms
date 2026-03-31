const express = require('express');
const router = express.Router();

router.route('/').get((req,res)=>{
    res.send('"/user" BLANK PAGE NO HTML');
}).post((req,res) =>{
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;


    const isValid = firstName!=="" && lastName!=="";
    if(isValid){
        console.log(`Adding User: ${firstName} ${lastName}`);
        users.push({firstName, lastName});
        res.render('users/list',{users});
    } else{
        console.log("Error adding user");
        res.render("users/new")
    }
});
router.get('/list', (req,res)=>{
    res.render('users/list', {users});
});

router.get('/new', (req,res)=>{
    res.render('users/new')
});


router.route('/:id').get((req,res) =>{
    console.log(req.user);
    console.log("Getting User Data!");
    res.send(`
        <h1>user data</h1>
        <p>First Name: ${req.user.firstName}</p>
        <p>Last Name: ${req.user.lastName}</p>

    `);
}).delete((req,res)=>{
    res.send(`Deleting User Data for id: ${req.params.id}`);
}).put((req,res) =>{
    res.send(`Updating User Data for id: ${req.params.id}`);
});

const users = [{firstName:"gabe", lastName:"zam"}, {firstName:"jess", lastName:"gom"}];
router.param("id", (req,res,next,id)=>{
    req.user = users[id];
    next();
});



module.exports = router;