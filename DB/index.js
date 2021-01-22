//calling the connection export to link-up with the sql database
const connection = require("./connection");

//creating a class and constructor to simplify some of the CRUD functions
class DB {
    constructor(connection){
        this.connection = connection;
    }

//will take the inquirer generated inputs and posts them to the employee table in the SQL database.
    createEmployee(personInfo) {
    console.log("You got it boss -- adding a new employee...\n");
    return this.connection.query("INSERT INTO employee SET ?", personInfo);
    }
//An attempt to search for employess by their department
    empByDepartment(deptId) {
        return this.connection.query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department department on role.department_id = department.id WHERE department.id = ?;",
            deptId);
            
    }
//returning all available departments
    viewDeparts(){
        console.log("Here are the current departments...")
        return this.connection.query(
            "SELECT * from department", function(err,res){
                if (err) throw err;
                console.table(res);
            }
        )
    }
//posting inquirer collected information to the SQL "department" table.
    createDepart(deptInfo){
        return this.connection.query(
            "INSERT INTO department SET ?", deptInfo);
    }
//return a list the current "role" table.
    viewRoles(){
        console.log("Here is a list of the roles: ")
        return this.connection.query(
            "SELECT * from role", function(err,res){
                if (err) throw err;
                console.table(res);
            }
        )
    }
// pushes inquirer collected information to the role table on SQL
    createRole(newRole){
        console.log("adding the role...")
        return this.connection.query(
            "INSERT INTO role SET ?", newRole)
    }
}
 


module.exports = new DB(connection)

//below was an attempt to run a employee search that will join tables showing role info & department info:
// SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"