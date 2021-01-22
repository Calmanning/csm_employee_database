
INSERT INTO department (name)
VALUES ("Monsters"),
       ("Rodeo Clowns"),
       ("Trap Testing"),
       ("Shark Jumper"),
       ("Cat Herding"),
       ("Accounting");

INSERT INTO role (title, salary,department_id)
VALUES ("Dr. Monster", 1000.99, 1),
       ("Boogeyman", 35000.33, 1),
       ("Skin Walker", 666.66, 1),
       ("The Dentist", 70074.00, 1),
       ("Clown", 25000.99, 1),
       ("Clown Tester", 20000.00, 1),
       ("Quick Sand Escape Artist", 12000.50, 2),
       ("A Literal Motorcycle", 100.72, 3),
       ("Shepard", 00000.00, 4),
       ("Account Manager", 75000.00, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Chuck", "Manjean", 1, NULL),
 ("Mincy", "Wells", 9, 1),
 ("Klarl", "Lingott", 4 , NULL),
 ("Freya", "Sheef", 2, 1);


SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;

-- SELECT employee.first_name, employee.last_name, employee.role_id, employee.manager_id 
-- FROM employee 
-- INNER JOIN role ON role.title = employee.role_id 
-- INNER JOIN department ON department.name = role.department_id;