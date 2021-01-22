//installing sql and util dependencies for sql CRUD functionality
const mysql = require("mysql");
const util = require("util");

//database boilerplate

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",

    password: "password",
    database: "employee_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log(`connected and running with id ${connection.threadId}`);
    console.log("good luck, StarFox");
})

//creating a module export to segment the functions between files and call this connection.
module.exports = connection