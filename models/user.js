const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const User = new Schema({
    username:  String,
    password: String,
    email:   String,
    mobile: String,
    token: String
  });

 var user = mongoose.model('user', User);

 module.exports = user;

 // let validPassword = (password) =>{
 // 	user.findOne({password:password},(err, info)=>{
 // 		if(err) return err;
 // 		if(!info{
 // 			return false;
 // 		}else{
 // 			return true;
 // 		}
 // 	})
 // }