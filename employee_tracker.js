var mysql = require("mysql");
const inquirer = require("inquirer");
require("console.table");
// const logo = require('asciiart-logo');
let roleArray = [];
let depArray = [];
let deleteArray = [];

var connection = mysql.createConnection({
  host: "localhost",

  // My port
  port: 3306,

  // My username
  user: "root",

  // My password
  password: "priyapassword",
  database: "employee_tracker_db"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  start();

});


function start() {
  inquirer.prompt({
    name: "actions",
    type: "list",
    message: "What do you want to do?",
    choices: [
      "View All Employees?",
      "View All Employees By Roles?",
      "View all Employees By Deparments?",
      "Update Employee?",
      "Add Employee?",
      "Add Role?",
      "Add Department?",
      "Delete Employee",
      "Exit"
    ]

  }).then(function (answer) {
    switch (answer.actions) {
      case "View All Employees?":
        // console.log("in switch statement");
        ViewEmployees();
        break;
      case "View All Employees By Roles?":
        ViewEmployeesByRoles();
        break;
      case "View all Employees By Deparments?":
        ViewEmployeesByDepartments();
        break;
      case "Update Employee?":
        UpdateEmployee();
        break;
      case "Add Employee?":
        AddEmployee();
        break;
      case "Add Role?":
        AddRole();
        break;
      case "Add Department?":
        AddDepartment();
        break;
      case "Delete Employee":
        DeleteEmployee();
        break;
      case "EXIT":
        exit();
        break;
    }

  });
}

function ViewEmployees() {
  // console.log("success");
  connection.query(`SELECT employee_id,first_name,last_name,department.department_name,role.title,role.salary FROM employee
  INNER JOIN role ON role.role_id=employee.role_id
  INNER JOIN department ON department.department_id=role.department_id`, function (err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    start();
  });

}

function ViewEmployeesByRoles() {
  connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      roleArray.push(res[i].title);
    }
    // console.log(" i am in ViewEmployeesByRoles");
    inquirer.prompt(
      {
        name: "roles",
        type: "list",
        message: "Which role of Employee's you want to list?",
        choices: roleArray
      }).then(function (answer) {
        connection.query(`SELECT employee_id,first_name,last_name,role.title,role.salary FROM employee
    INNER JOIN role ON role.role_id= employee.role_id
    WHERE role.title= "${answer.roles}"
    ORDER BY (employee_id)`, function (err, res) {
          if (err) throw err;
          // Log all results of the SELECT statement
          console.log("\n");
          console.table(res);
          start();
        });

      })
  })
}

function ViewEmployeesByDepartments() {
  // console.log(" i am in ViewEmployeesByDepartments");
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      depArray.push(res[i].department_name);
    }
    inquirer.prompt(
      {
        name: "departments",
        type: "list",
        message: "Which department of Employee's you want to list?",
        choices: depArray
      }).then(function (answer) {
        connection.query(`SELECT employee_id,first_name,last_name,department.department_name FROM employee
      INNER JOIN role ON role.role_id=employee.role_id
      INNER JOIN department ON department.department_id=role.department_id
      WHERE department.department_name="${answer.departments}"
      ORDER BY (employee_id);`, function (err, res) {
          if (err) throw err;
          console.log("\n");
          console.table(res);
          start();
        });

      })
  })

}

function UpdateEmployee() {
  console.log(" i am in Update Employee");
  start();
}

// function AddEmployee(){
//   console.log(" i am in AddEmployee");
//   inquirer.prompt(
//     {
//     name: "firstName",
//     type: "input",
//     message: "What is the first name of the employee?",
//   },
//   {
//     name: "lastName",
//     type: "input",
//     message: "What is the last name of the employee?",
//   },
// {
//     name: "adding",
//     type: "list",
//     message: "What is the Employee's role?",
//     choices: [
//       "View All Employees?",  
//       "View All Employees By Roles?",
//       "View all Employee By Deparments?",
//       "Update Employee?",
//       "Add Employee?",
//       "Add Role?",
//       "Add Department?"
//     ]
//   }
//   start();
// }

function AddRole() {
  console.log(" i am in AddRole");
  start();
}


function AddDepartment() {
  // console.log(" i am in AddDepartment");
  inquirer.prompt(
    {
      name: "addDepart",
      type: "input",
      message: "What is the name of the department you want to add?"
    }
  ).then(function (answer) {
    connection.query(`SELECT EXISTS(SELECT * FROM department WHERE department_name="${answer.addDepart}")`, function (err, res) {
      if (err) {
        throw err;
      }
      else if (res = 0) {
        console.log(`you can add department ${res}`);

      }
      else if (res = 1) {
        console.log(`This Department is already existed in the DataBase ${res}`);

        ViewEmployees();
        // connection.query(`INSERT INTO department(department_name)VALUES('${answer.addDepart})`, (err, res) => {
        //           if (err) throw err;
        //           console.log("ONE NEW ROLE ADDED" + answer.title);
        //           ViewEmployees();
      }
      // console.log("\n");
      // console.table(res);
      // start();
    })
  })
}

function DeleteEmployee() {
  // console.log(" i am in delete Employee");
  ViewEmployees();
  connection.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      deleteArray.push(res[i].employee_id);
    }
    inquirer.prompt(
      {
        name: "deleteEmployee",
        type: "input",
        message: "Enter the id of the employee you want to delete?",
      }).then(function (answer) {

        connection.query(`DELETE FROM employee WHERE employee_id="${answer.deleteEmployee}"`
          , function (err, res) {
            if (err) throw err;
            console.log("\n");
            ViewEmployees();
          });

      })
  })

}

function exit() {
  connection.end();
}