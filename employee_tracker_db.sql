-- employee_tracker_db
-- employee_tracker.js
DROP DATABASE IF EXISTS employee_tracker_db;
CREATE DATABASE employee_tracker_db;
USE employee_tracker_db;

CREATE TABLE department(
  department_id INT  AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(30) 
  -- PRIMARY KEY(department_id)
);

CREATE TABLE role(
role_id INTEGER(30) NOT NULL AUTO_INCREMENT,
title VARCHAR(30) NOT NULL,
department_id INT,
salary decimal(10,2) ,
PRIMARY KEY(role_id),
CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(department_id) ON DELETE CASCADE
);

CREATE TABLE employee(
employee_id INTEGER(30) AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT,
-- manager_id INT UNSIGNED,
CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(role_id) ON DELETE CASCADE
-- CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(employee_id) ON DELETE SET NULL
);

-- INSERTING VALUES IN DEPARTMENT TABLE for 4 departments_ID's
INSERT INTO department (department_name)
VALUES("Engineering"),("Finance"),("Legal"),("Sales");

-- INSERTING VALUES IN ROLE TABLE for 7 ROLE_ID'S
INSERT INTO role(title,salary,department_id)
VALUES 
("Sales Lead", 100000,3),
("Lead Engineer", 150000,2),
("Software Engineer", 120000,4),
("Accountant", 125000,3),
("Legal Team Lead", 250000,4),
("Sales person", 80000,1),
("Lawyer", 190000,1);



-- INSERTING VALUES IN EMPLOYEE TABLE FOR 7 EMPLOYEE ID'S
INSERT INTO employee
         (first_name,last_name,role_id)
VALUES 
         ('John', 'Doe',2),
         ('Mike', 'Chan',5),
         ('Ashley', 'Rodriguez',3),
         ('Kevin', 'Tupik',4),
         ('Malia', 'Brown',6),
         ('Sarah', 'Lourd',1),
         ('Tom', 'Allen',6);


-- TABLES IN OUR SQL WORKBENCH 
SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;


-- View all Employees
SELECT employee_id,first_name,last_name,department.department_name,role.title,role.salary FROM employee
INNER JOIN role ON role.role_id=employee.role_id
INNER JOIN department ON department.department_id=role.department_id;

-- View employee's by role
SELECT employee_id,first_name,last_name,role.title,role.salary FROM employee
INNER JOIN role ON role.role_id= employee.role_id;

-- View employee by departments
SELECT employee_id,first_name,last_name,department.department_name FROM employee
INNER JOIN role ON role.role_id=employee.role_id
INNER JOIN department ON department.department_id=role.department_id
WHERE department.department_name="sales"
ORDER BY (employee_id);

-- Add Department
INSERT INTO department(department_name)
VALUES("Fire");

SELECT EXISTS(SELECT * FROM department WHERE department_name="legal");