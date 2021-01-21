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
    role_id  NULL,
    manager_id INT NULL,
    PRIMARY KEY (id)
);

INSERT INTO department (name)
VALUES ("Monster Tamer");

INSERT INTO role (title, salary,department_id)
VALUES ("Monster Doctor", 1000.99, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Chuck", "Manjean", 1,1);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;