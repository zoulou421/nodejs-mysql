const express=require("express");
const mysql= require("mysql");

//create connection
const db= mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"nodemysql"
});

//Connect to mysql
db.connect(err=>{
   if(err){
       throw err;
   }
   console.log("MYSQL connected.");
});

const app= express();

//create db
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

//create table
app.get('/createemployee',(req, res)=>{
    let sql= 'CREATE TABLE employee(id int AUTO_INCREMENT, name VARCHAR(255),designation VARCHAR(255),PRIMARY KEY (id))';
    db.query(sql,err=>{
        if(err){
            throw err;
        }else {
            res.send("table employee successfully created!");
        }
    });
});

//insert employee
app.get('/employee1',(req, res)=>{
    let post={name:"Bonevy BEBY",designation:"Chef executive Officer"}
    let sql='INSERT INTO employee SET ?'
    let query=db.query(sql,post, err=>{
        if(err){
            throw err;
        }else{
            res.send("employee added successfully");
        }
    })
})

//select employee
app.get("/getemployee",(req,res)=>{
   let sql='SELECT * FROM employee' ;
   let query=db.query(sql,(err, results)=>{
    if(err){
        throw err;
    }else{
        console.log(results);
        res.send("Employee details fetched!")
    }
   });
});

//update employee:
app.get('/updateemployee/:id',(req, res)=>{
    let newName="Laurore BEBY";
  //  let sql= `UPDATE employee SET name= `${newName}` WHERE id= ${req.params.id}`
    let sql = `UPDATE employee SET name='${newName}'  WHERE id=${req.params.id}`;
    let query= db.query(sql,err=>{
        if(err){
            throw err;
        }else{
            res.send("employee updated!");
        }
    })
});

const port=(process.env.PORT||3000);

app.listen(port,(req,res)=>{
 console.log("Server started at port :"+port);
});