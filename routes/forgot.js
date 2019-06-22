var db=require("./database")
var nodemailer=require("nodemailer")

module.exports=(req,res)=>{
	var email=req.body.email;

	var sql="select * from user where email='"+email+"'"
	db.query(sql,(err,res)=>{
		if(err)
			console.log(err)
		else{
			if(res.length>0)
			{
				var password=res[0].newkey;
				console.log(password);
				var transporter=nodemailer.createTransport({
                	service:'gmail',
                	auth:{
                      user:'namyasinha2@gmail.com',
                      pass:'#12345@alpi'
                    }
                })

                var mailOption={
                	from: 'namyasinha2@gmail.com', // sender address
                    to:req.body.email, // list of receivers
                    subject: 'node mailer', // Subject line
                    text: `here is your token you forgot ${password}`,
                }
                transporter.sendMail(mailOption,(err,info)=>{
                	if (err)
                		console.log(err);
                	else
                		console.log(info.messageId)
                	    console.log("forgot password email sent")
                })
			}
		}
	})
}