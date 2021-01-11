# Employee_tracker
## Description
Employee Tracker is a CLI applicaiton for building and maintaining companies employee data base. Built on MySQL and leveraging modularity in the structure of Employee Tracker, it can scale appropriatley with a companies growth without reconfiguring the core structure of the internal employee data base. This application can act as a foundation to continue to build upon. Employee allows managers or someone within the company to view all employees, roles, as well as departments. It also allows for adding employees, roles, departments and updating employees all from your CLI.

## Table of Contents 

* [Installation](#Installation)
* [User Story](#UserStory)
* [Technologies_Used](#Technologies_Used)
* [Code_Snippet](#Code_Snippet)
* [Final_Result](#Final_Result)
* [Video_Demo](#Video_Demo)
* [Github_Link](#Github_Link)



## Installation
In order to use this application you will need to first run an npm install in your CLI to install the dependencies that have been loaded into the json files for you. Once this is done, run node employee_tracker.js in your CLI to start the prompts that will walk you through the verious tasks you can perform with this application.


## UserStory
As a business owner<br>
I want to be able to view and manage the departments, roles, and employees in my company<br>
So that I can organize and plan my business

## Technologies_Used

MySQL: Relational database management system based on SQL – Structured Query Language, used in this applicationt to warehouse and query employee and company data.<br>
Express.js - Used for application set up of middle ware for end point connection between the front end and backend.<br>
Node.js - Used for package managment and to execute JavaScript code to build command line tool for server-side scripting.<br>
Javascript - Used to base functionality of functions and prompts within the application.<br>
Git - Version control system to track changes to source code<br>
GitHub - Hosts repository that can be deployed to GitHub Pages<br>

## Code_Snippet
The following code snippet shows the schema that is the base for our link between our employee_tracker.js file that oeprates the functions for building upon our employee Table, role Table and department Table. we have same schema set up in our sql workbench.Once the connections are set up via calling upon our required mysql package and connection port, We can then execute the functionality of the application through our JavaScript.

```
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
CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(role_id) ON DELETE CASCADE
);
```

## Final_Result
Testing 
![](Assets/screenshotTest.png)
![](Assets/screenshotBrowser.png)

## Video_Demo
[Click to Watch the Video](https://drive.google.com/file/d/14Q8pHlC8-h4D6Bux6fXQvUejTbpiKrjg/view)

## Github_Link
[**URL of My Github Repository**](https://github.com/guptaria/Employee_tracker)<br>
