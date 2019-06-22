var express=require('express');
var nodemailer=require('nodemailer');
var db=require('./routes/database');
//var multer=require("multer");
var mkdirp=require("mkdirp");
var fileUpload=require("express-fileupload");
var path=require("path");
var ejs=require("ejs");
var session=require("express-session");
var bodyParser = require("body-parser");
var mysql=require("mysql");
var session = require("express-session")

var app=express();
app.use('/images', express.static('images'))




app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('view engine','ejs');
app.use(session({secret:"wesdfgtrftt564324", saveUninitialized:true, resave:true}))
/*app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

*/
app.use(fileUpload())


var auth=function(req,res,next){
	if(req.session.loggedIn){
		next();
	}
	else{
		res.redirect("/")
	}
}
var register = require("./routes/register")
  app.route("/register").post(register)
  app.get('/register',(req,res)=>{
    res.sendFile(__dirname+"/register.html");
  })

var login = require("./routes/login")
app.route('/login').post(login)
app.get("/login",(req,res)=>{
	res.sendFile(__dirname+"/login.html")
})

var forgot=require("./routes/forgot")
app.route("/forgot").post(forgot)
app.get("/forgot",(req,res)=>{
	res.sendFile(__dirname+"/forgot.html")
})

app.get("/",(req,res)=>{
   res.sendFile(__dirname+"/dash.html")

})
app.get("/events",(req,res)=>{
	db.query("select * from events",(err,results)=>{
		res.render('events',{
			event:results
		})
	})
})

app.get("/admin_events",auth,(req,res)=>{
	db.query("select * from events",(err,results)=>{
		res.render('admin_events',{
			event:results
		})
	})
})


var add_events=require("./routes/add_events")
app.route("/add_events").post(add_events)
app.get("/add_events",auth,(req,res)=>{
	res.sendFile(__dirname+"/add_events.html")
})

app.get("/logout",(req,res)=>{
	req.session.loggedIn=false;
	res.redirect("/")
})



















var port=process.env.PORT||3000;
 app.listen(port,(err)=>{
 	if(err)
 		console.log("error occured");
 	else
 		console.log("App listening at "+port);
 })