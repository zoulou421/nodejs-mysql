const express=require("express");
const mysql= require("mysql");

//create connection
const db= mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
});

//Connect to mysql
db.connect(err=>{
   if(err){
       throw err;
   }
   console.log("MYSQL connected.");
});

const app= express();

app.get("/createdb",(req, res)=>{
 let sql="CREATE DATABASE nodemysql";
 db.query(sql, err=>{
     if(err){
         throw err;
     }else{
         res.send("Database created!");
         console.log("your database has been created successfully!");
     }
 });
});

const port=(process.env.PORT||3000);

app.listen(port,(req,res)=>{
 console.log("Server started at port :"+port);
});