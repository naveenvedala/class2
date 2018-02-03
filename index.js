// const http = require('http');
// const path = require('path');

// let pages = [
//     {route:"aboutus", content:"About Us Page"},
//     {route:"contactus", content:"Contactus page"}
// ];

// http.createServer(function(request, response){
//     let lookup = path.basename(decodeURI(request.url));
//    for(i=0;i<pages.length;i++){
//        if(pages[i].route == lookup){
//         response.writeHead(200, {'Content-Type':'text/html'});
//         response.end(`<h1>${pages[i].content}</h1>`);
//        }
//    }
//    response.writeHead(404, {'Content-Type':'text/html'});
//    response.end("<h1>Page Not Found</h1>");
    
// }).listen(8080);


const express = require('express');
const app = express();
const ejs = require('ejs');
const bodyParser = require('body-parser');
const login = require('./routes/login');
const rest = require('./routes/rest');
const session = require('express-session');
var passport = require('passport');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');

app.use(passport.initialize());
app.use(passport.session());


app.set('view engine', 'ejs');

//Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Static Files
app.use(express.static('public'));
app.use('/images', express.static('images'));

//Session
app.use(session({ secret: 'saometgonsddfsasfsa', cookie: { maxAge: 360000 }}))

//Routes
app.use('/rest', rest);
app.use('/', login);




//Middle Ware
// app.use((req, res, next)=>{
//     console.log("Im Middle Ware...");
//     next();
// })

// function middle(req, res, next){
//     console.log("Authenticated")
//     next();
// }



app.listen(8080, ()=>{
    console.log('Server Started on port 8080')
});

// function name(s,f){
//     console.log(s, f)
// }
// name(10,20);

// let name1 = (s,f) =>{
//     console.log(s, f)
// }

// name1(10,20)