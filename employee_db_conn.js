const mysql = require("mysql");
const inquirer = require("inquirer");


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
    addEmployee();
    // connection.end();
})

function addEmployee() {
    console.log("You got it boss -- adding a new employee...\n");
    const query = connection.query(
        "INSERT INTO employee SET ?",
        {
            first_name: "Mincy",
            last_name: "Wells",
            role_id: 2,
            manager_id: 11
        },
        function (err, res) {
            if (err) throw err;
            console.log(query);
            console.table(res);
            editEmployee()
        });
    console.table(query.sql);;
}

function editEmployee() {
    console.log("Right chief, updating employee information");
    const query = connection.query(
        "UPDATE employee set ? WHERE ?",
        [
        {
            role_id: 3
        },
        {
            id: 2
        }
        ],
        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " employee updated.");
            deleteEmployee()
        });
}

function deleteEmployee(){
    console.log("tough break, man. Let's just get this done.");
    const query = connection.query( 
        "DELETE FROM employee WHERE ?",
        {
            id:"8"
        },
        function (err, res){
            if (err) throw err;
            console.table(res)
            console.log("Alright, that's take care of");
            readEmployee();
        }
    )
}

function readEmployee() {
    console.log("So here's a list of the employees...\n");
    const query = connection.query("SELECT * FROM employee", function(err, res) {
        if (err) throw err;
        console.table(res);
        connection.end()
    });
}