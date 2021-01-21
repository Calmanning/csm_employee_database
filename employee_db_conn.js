const mysql = require("mysql");
const inquirer = require("inquirer");


const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",

    password: "password",
    database: "employee_db"
});

connection.connect(function(err){
    if (err) throw err;
    console.log(`connected and running with id ${connection.threadId}`);
    console.log("good luck, StarFox");
    connection.end();
})