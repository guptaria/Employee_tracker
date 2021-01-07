-- employee_tracker_db
-- employee_tracker.js
DROP DATABASE IF EXISTS employee_tracker_db;
CREATE DATABASE employee_tracker_db;
USE employee_tracker_db;

CREATE TABLE department(
  department_id INTEGER(30) NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(30),
  PRIMARY KEY(department_id)
);

CREATE TABLE role(
role_id INTEGER(30) NOT NULL AUTO_INCREMENT,
title VARCHAR(30) NOT NULL,
department_id INTEGER(30),
salary decimal(10,2) ,
PRIMARY KEY(role_id),
FOREIGN KEY (department_id) REFERENCES department(department_id)
);

CREATE TABLE employee(
employee_id INTEGER(30) NOT NULL AUTO_INCREMENT,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INTEGER(30),
PRIMARY KEY(employee_id),
FOREIGN KEY (role_id) REFERENCES role(role_id)
);

-- INSERTING VALUES IN DEPARTMENT TABLE for 4 departments_ID's
INSERT INTO department (department_name)
VALUES("Engineering"),("Finance"),("Legal"),("Sales");

-- INSERTING VALUES IN ROLE TABLE for 8 ROLE_ID'S
INSERT INTO role(title,salary,department_id)
VALUES ("Sales Lead", 100000,3),("Lead Engineer", 150000,3),("Software Engineer", 120000,3),("Accountant", 125000,3),("Legal Team Lead", 250000,3),("Sales person", 80000,3),("Lawyer", 190000,3);



-- INSERTING VALUES IN EMPLOYEE TABLE FOR 7 EMPLOYEE ID'S
INSERT INTO employee(first_name,last_name,role_id)
VALUES ('John', 'Doe',2);
INSERT INTO employee(first_name,last_name,role_id)
VALUES ('Mike', 'Chan',5);
INSERT INTO employee(first_name,last_name,role_id)
VALUES ('Ashley', 'Rodriguez',3);
INSERT INTO employee(first_name,last_name,role_id)
VALUES ('Kevin', 'Tupik',4);
INSERT INTO employee(first_name,last_name,role_id)
VALUES ('Malia', 'Brown',6);
INSERT INTO employee(first_name,last_name,role_id)
VALUES ('Sarah', 'Lourd',1);
INSERT INTO employee(first_name,last_name,role_id)
VALUES ('Tom', 'Allen',6);

--TABLES IN OUR SQL WORKBENCH 
SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;


-- view employee by role
SELECT employee_id,first_name,last_name,role.title,role.salary FROM employee
INNER JOIN role ON role.role_id= employee.role_id;

-- view employee by departments
SELECT employee_id,first_name,last_name,department.department_name FROM employee
INNER JOIN role ON role.role_id=employee.role_id
INNER JOIN department ON department.department_id=role.department_id;

connection.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;