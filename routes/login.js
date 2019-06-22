var db=require("./database");



module.exports=(req,res)=>{
    var email=req.body.email;
    console.log(email);
    var passkey=req.body.key;
	var sql="select * from user where email='"+email+"'"
	db.query(sql,(err,results)=>{

		if(results.length>0){
			if(results[0].newkey==passkey)
			{    
				 req.session.loggedIn=true;
				 req.session.email=email;
                 return res.redirect("/add_events");
                 console.log("entered")

			}
			else
				{console.log("wrong credentials");
			     res.render('login',{
		    	message:"Entered wrong credentials"
		    })
			}
		}
		else
			//console.log("no email registered");
		    

		    res.render('login',{
		    	message:"No email registered"
		    })

	})
}