var db=require('./database');
var nodemailer=require('nodemailer');

module.exports=(req,res)=>{
var email=req.body.email;
console.log(email);
/*var auth={
	type:'OAuth2',
	user:'namyasinha2@gmail.com',
	clientId:'407408718192.apps.googleusercontent.com',
	clientSecret:'************',
	refreshToken:'1/Zbjmk2JNg18FPnb-yH7OXg9AZxVo0h56G0Qgq1Q3FcAyrX96OF5x13LZeu7iVRDS'

};*/

var sql="select * from user where email='"+email+"'";
db.query(sql,(err,results)=>{
	if(err)
		console.log(err);
	else
	{
		if(results.length>0)
			{console.log("user with this email already exist");
        res.render('register',{
                message:"User with this email already exist"
            })

    }
		else{
                
                var transporter=nodemailer.createTransport({
                	service:'gmail',
                	auth:{
                      user:'namyasinha2@gmail.com',
                      pass:'#12345@alpi'
                    }
                })
                var key=Math.floor(Math.random()*10000000)
                var sql2="insert into user values('"+email+"','"+key+"')"
                db.query(sql2,(err,res)=>{
                	if(err)
                		console.log(err);
                	else
                		{console.log("registered")
                      //res.send("you are registered")
                      res.render('register',{
                message:"Registered"
            })

                  }
                })
                var mailOption={
                	from: 'namyasinha2@gmail.com', // sender address
                    to:req.body.email, // list of receivers
                    subject: 'node mailer', // Subject line
                    text: `here is your token ${key}`,
                }
                transporter.sendMail(mailOption,(err,info)=>{
                	if (err)
                		console.log(err);
                	else
                		console.log(info.messageId)
                	    console.log("email sent")
                })
		}

	}
})

}