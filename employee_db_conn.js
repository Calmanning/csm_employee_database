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
    getStart();
    // addEmployee();
    // connection.end();
})

function getStart(){
    inquirer
        .prompt(
            {
                name: "options",
                type: "list",
                message: "Welcome to the Business Corp, Business Co.'s DataBusiness\n...we mean Database.\n Now! What would you like to do?",
                choices: ["add an employee", "edit employee role", "remove employee", "add role","add department", "view employee list"]
            })
            .then(choiest => {
                switch(choiest.options) {
                    case "add an employee":
                        addEmployee()
                        break;

                    case "edit employee role":
                        editEmployeeRole()
                        break;

                    case "remove employee":
                        deleteEmployee()
                        break;

                    case "add role":
                        console.log("function not yet ready. Still got more work to do.");
                        connection.end()
                        break;

                    case "add department":
                        console.log("function not yet ready. Still got more work to do.");
                        connection.end()
                        break;
                    
                    case "view employee list":
                        readEmployee()
                        break;

                    default:
                        readEmployee()
                }
                
            })
    }

function addEmployee() {
    // TODO: add inquirer prompts to fill the inserted info
    inquirer.prompt([
        {
            name: "first_name",
            type: "input",
            message:"What is the employee's first name?"
        },
        {
            name: "last_name",
            type: "input",
            message:"And what is their last name?"
        },
        {
            name: "role_id",
            type: "input",
            message:"What is their role_id number?"
        },
        {
            name: "manager_id",
            type: "input",
            message:"What is their manager's id number?"
        }
    ]).then(input =>{

        console.log("You got it boss -- adding a new employee...\n");
    const query = connection.query(
        "INSERT INTO employee SET ?",
        {
            first_name: input.first_name,
            last_name: input.last_name,
            role_id: input.role_id,
            manager_id: input.manager_id
        },
        function (err, res) {
            if (err) throw err;
            console.log(query);
            console.table(res);
            readEmployee()
        });
    console.table(query.sql);

    })
    
}

function editEmployeeRole() {
    // TODO: Add inquirer prompts to specify the changes needed.
    inquirer.prompt([
        {
            name: "id",
            type: "list",
            message: "Which employee?",
            choices: "connection.query('SELECT * FROM employee')"
            // can I populate a list of the current employees table, and have them select from that? yes. for loops.
        },
        {
        name: "new_role_id",
        type: "input",
        message: "what is their new role?"
        }
    ])
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
            readEmployee();
        });
}

function deleteEmployee(){
    // TODO: provdide a table of the employess and a prompt for the employee's id.
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