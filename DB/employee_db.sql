DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50),
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(100),
    salary DECIMAL(10,2),
    department_id INT,
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    role_id  INT NULL,
    manager_id INT NULL,
    PRIMARY KEY (id)
);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;

-- SELECT employee.first_name, employee.last_name, employee.role_id, employee.manager_id 
-- FROM employee 
-- INNER JOIN role ON role.title = employee.role_id 
-- INNER JOIN department ON department.name = role.department_id;