const express = require('express');
const router = express.Router();
const Joi = require('joi');

router.get('/', (req, res)=>{
    res.send("Welcome to Basic Route");
})

router.get('/registration', (req, res)=>{
    res.render('registration.ejs');
})

router.post('/register', (req, res)=>{

    let data = Joi.object().keys({
        Username:Joi.string().required().min(6),
        Email: Joi.string().email(),
        Password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
        Confirmpassword: Joi.valid(Joi.ref('Password')),
        gender: Joi.required()
    })

    let validate = Joi.validate(req.body,data);
    if(validate.error==null){
        res.send(req.body)
    }else{
        res.send("Validation Error");
    }
})

let users = [{name:"naveen", email:"vedala.naveen23@gmail.com", mobile:970352253, password:"naveen",active:true},
            {name:"Pompee", email:"pompee@gmail.com", mobile:9703522533, password:"pompee", active:true},
            {name:"digital", email:"digital@gmail.com", mobile:9703352253, password:"digital", active:true}]

router.post('/login', (req, res)=>{
    let u = false;
    let data;
    users.forEach((value)=>{
  
        if(value.email==req.body.Email&&value.password==req.body.Password){
            u = true;
            data = value;
        }
    })

    if(u==true){
        req.session.user = data;
        res.send(`Hi ${data.name}, Welcome to Dashboard`);
    }else{
        res.send("No User Found");
    }
});

router.get('/dashboard', (req, res)=>{

    console.log(req.session.user);
    if(req.session.user){
        let user = req.session.user;
        res.send(`Hello ${user.name}, Mobile: ${user.mobile}`);
    }else{
        res.redirect('/registration');
    }
})

router.get('/logout', (req, res)=>{
    req.session.destroy((err)=>{
        if(err){
            res.send(err)
        }else{
            // console.log(data)
            res.send("Session distroyed")
        }
    });
})

// router.get('/', function(req, res){
//     //res.send({name:'naveen'})
//     res.render('home.ejs',{heading:req.query.heading, student:req.query.student, trainer:req.query.trainer});
// })

// router.get('/registration', (req, res)=>{
//     res.send('Trainer Reg Us Page')
// })

router.get('/contactus', (req, res)=>{
    res.sendFile(__dirname+'../public/contact.html')
})



module.exports = router;