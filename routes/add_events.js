var db=require("./database")
var mkdirp=require("mkdirp");
var mv=require("mv");
var fs=require("fs");
module.exports=(req,res)=>{
	var title=req.body.event_title;
	var location=req.body.event_location;
	var st_date=req.body.event_start_date;
	var en_date=req.body.event_end_date;
	var folder=req.body.event_folder;
	//creating folder
	mkdirp('./'+folder,(err)=>{
	if(err)
		console.log(err);
	else
		console.log("yeah");
})
	/*var publicDir=require('path').join(__dirname,'/'+folder);
	app.use(express.static(publicDir));
	*/

	var file=req.files.upload;

	
    var len=file.length;
    for(var i=0;i<len;i++)
    {
    	var event_pic=file[i].name;
    	//var up="yggrke"+folder;
    	var uploadpath="./"+folder+"/"+event_pic;
    	
    	file[i].mv(uploadpath,err=>{
    		if(err)throw err
    	    else 
    	    	{console.log("uploaded");
    	    //res.send("file uploaded");
    	}

    	})


    }
    
	
	
     //var uploadpath="./"+folder;
	var sql="insert into events values('"+title+"','"+location+"','"+st_date+"','"+en_date+"','"+folder+"')"
	db.query(sql,(err,results)=>{

		if(err)
			console.log(err);

		else
		{   
			res.redirect("/admin_events")
			console.log("data entered");
		}


	})

	
	
}


