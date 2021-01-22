// connecting the files and dependencies between the other files.
const db = require("./DB");
const inquirer = require("inquirer");
const { viewRoles } = require("./DB");

// getting the whole thing started. This is intended to be a looping function, waiting for a "quit" command selection.
getStart()
// launches a long prompt that will feed into a large switchboard directing into other functions.
function getStart() {
    inquirer
        .prompt(
            {
                name: "options",
                type: "list",
                message: "Welcome to the Business Corp, Business Co.'s DataBusiness\n...we mean Database.\n Now! What would you like to do?",
                choices: ["View employee list", "Add an employee", "Edit employee role", "Remove employee", "Employees by Department", "View roles", "Add role", "remove role", "View departments", "Add department", "Remove Department", "I quit"]
            })
        .then(choiest => {
            switch (choiest.options) {
                case "I quit":
                    console.log("okay. Quitter.")
                    process.exit()

                case "Add an employee":
                    addEmployee();
                    break;

                case "Edit employee role":
                    findEmployee();
                    break;

                case "Remove employee":
                    deleteEmployee();
                    break;

                case "View roles":
                    db.viewRoles()
                    getStart()
                    break;

                case "Add role":
                    addRole()
                    break;

                case "Add department":
                    addDepart();
                    break;

                case "View employee list":
                    readEmployee();
                    break;

                case "Employees by Department":
                    findEmpByDept()
                    break;

                case "View departments":
                    db.viewDeparts();
                    getStart();
                    break;

                default:
                    readEmployee();
                    process.exit();
            }

        })
}

// 
function addEmployee() {
    let employee = {}
    
    inquirer.prompt([
        {
            name: "first_name",
            type: "input",
            message: "What is the employee's first name?"
        },
        {
            name: "last_name",
            type: "input",
            message: "And what is their last name?"
        },
        {
            name: "role_id",
            type: "input",
            message: "What is their role_id number?"
        },
        {
            name: "manager_id",
            type: "input",
            message: "What is their manager's id number?"
        }
    ]).then(input => {
        employee = {
            first_name: input.first_name,
            last_name: input.last_name,
            role_id: input.role_id,
            manager_id: input.manager_id
        }
        // logging the inputs and then calling out to the post function on the index.js file
        console.log(employee);
        db.createEmployee(employee);
        //looping back
        getStart()
    })

}
// an in-process function that will dovetail into changing employee information.
function findEmployee() {
    // TODO: Add inquirer prompts to specify the changes needed.
    let empRole = {}
    db.connection.query("SELECT * FROM employee", (err, employees) => {
        if (err) {
            throw err
        } else {
            const namesOfEmployees = [];
            for (let i = 0; i < employees.length; i++) {
                const inqObjt = {
                    name: `${employees[i].first_name} ${employees[i].last_name}`,
                    value: employees[i]
                }
                namesOfEmployees.push(inqObjt)
            }
            console.log(employees)
            console.log("=================================")
            console.table(namesOfEmployees)
            inquirer.prompt([
                {
                    name: "name",
                    type: "list",
                    message: "Update which employee's information?",
                    choices: namesOfEmployees
                }
            ]).then(answer => {
                console.log(answer)
                console.log(answer.id)
                empRole = {
                    id: answer.id,
                    name: answer.role_id
                }
                console.log(answer)
                // editEmployee()
            })

            // console.log("Right chief, updating employee information");
            // const query = connection.query(
            //     "UPDATE employee set ? WHERE ?",
            //     [
            //     {
            //         role_id: 3
            //     },
            //     {
            //         id: 2
            //     }
            //     ],
            //     function (err, res) {
            //         if (err) throw err;
            //         console.log(res.affectedRows + " employee updated.");
            //         readEmployee();
            //     });

        }
    })

}
//an in-process function that needs to collect the employee's id from their name and then delete the id on sql.
function deleteEmployee() {
    // TODO: provdide a table of the employess and a prompt for the employee's id.
    console.log("tough break, man. Let's just get this done.");
    const query = connection.query(
        "DELETE FROM employee WHERE ?",
        {
            // id:"8"
        },
        function (err, res) {
            if (err) throw err;
            console.table(res)
            console.log("Alright, that's taken care of");
            readEmployee();
        }
    )
}
//function that will return a table of the current "employee" table
function readEmployee() {
    console.log("So here's a list of the employees...\n");
    db.connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        console.table(res);
        db.connection.end()
    });
}
// asks the user for the department their interested in and then attempts to search for employees in that department 
function findEmpByDept() {
    let dept = {};
    db.connection.query("SELECT * FROM department", (err, departments) => {
        if (err) {
            throw err
        } else {
            const nameOfDepartments = [];
            for (let i = 0; i < departments.length; i++) {
                const inqObjt = {
                    name: `${departments[i].name}`,
                    value: departments[i]
                }
                nameOfDepartments.push(inqObjt)
            }
            console.log(departments)
            console.log("=================================")
            console.table(nameOfDepartments)
            inquirer.prompt([
                {
                    name: "departments",
                    type: "list",
                    message: "Which departments's information?",
                    choices: nameOfDepartments
                }
            ]).then(choice => {
                console.log(choice);
                dept = {
                    id: choice.id,
                    name: choice.name
                }
                console.log(dept.id);
                db.empByDepartment(dept)
            })
                ;
        }
    })

}
// launches inquirer prompts that will then be sent to the "createDepart()"" in the index.js file
function addDepart() {
    let departObj = {}
    // TODO: add inquirer prompts to fill the inserted info
    inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "What's the name of the department?"
        }
    ]).then(input => {
        departObj = {
            name: input.name,
        }

        console.log(departObj);
        console.log("The department has been added");
        db.createDepart(departObj);



        getStart()
    })

}
//will launch inquirer prompts that will collect information to pass onto the "createRole()" function in index.js
function addRole() {
    let newRole = {}
    // TODO: add inquirer prompts to fill the inserted info
    db.connection.query("SELECT * FROM department", (err, depts) => {
        if (err) {
            throw err
        } else {
            const namesOfDepts = [];
            for (let i = 0; i < depts.length; i++) {
                const inqObjt = {
                    name: depts[i].name,
                    
                }
                namesOfDepts.push(inqObjt)
            }
            console.table(namesOfDepts)
            console.log("=================================")
            inquirer.prompt([
                {
                    name: "title",
                    type: "input",
                    message: "What is the title of the role?"
                },
                {
                    name: "salary",
                    type: "input",
                    message: "And what is the salary? (numbers only, please)"
                },
                {
                    name: "id",
                    type: "list",
                    message: "which department is it in?",
                    choices: namesOfDepts
                },

            ]).then(input => {
                newRole = {
                    title: input.title,
                    salary: input.salary,
                    department_id: input.id
                }

                console.log(newRole);
                db.createRole(newRole);

                getStart()
            })
        }
    })
}
