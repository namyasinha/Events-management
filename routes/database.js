var mysql=require("mysql")

var connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"ongc"
})

connection.connect((err)=>{
    if(err)
    console.log(err);
    else
    console.log("Database connected...")
})

module.exports=connection