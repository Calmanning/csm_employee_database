const connection = require("./connection");

class DB {
    constructor(connection){
        this.connection = connection;
    }

    createEmployee(personInfo) {
    console.log("You got it boss -- adding a new employee...\n");
    return this.connection.query("INSERT INTO employee SET ?", personInfo);
    }

    empByDepartment(deptId) {
        return this.connection.query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department department on role.department_id = department.id WHERE department.id = ?;",
            deptId);
            
    }

    viewDeparts(){
        console.log("Here are the current departments...")
        return this.connection.query(
            "SELECT * from department", function(err,res){
                if (err) throw err;
                console.table(res);
            }
        )
    }

    createDepart(deptInfo){
        return this.connection.query(
            "INSERT INTO department SET ?", deptInfo);
    }

    viewRoles(){
        console.log("Here is a list of the roles: ")
        return this.connection.query(
            "SELECT * from role", function(err,res){
                if (err) throw err;
                console.table(res);
            }
        )
    }

    createRole(newRole){
        console.log("adding the role...")
        return this.connection.query(
            "INSERT INTO role SET ?", newRole)
    }
}
 
// SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"

module.exports = new DB(connection)