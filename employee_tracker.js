//======== Dependencies===================//
var mysql = require("mysql");
const inquirer = require("inquirer");
require("console.table");
// const logo = require('asciiart-logo');
let roleArray = [];
let depArray = [];
let deleteArray = [];
let depRoleArray = [];
let displayRoleArray = [];

//========== Connection ID ==========================//
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

//================== Initial Prompt =======================//
function start() {
  inquirer.prompt({
    name: "actions",
    type: "list",
    message: "What do you want to do?",
    choices: [
      "View All Employees?",
      "View all Employees By Deparments?",
      "View All Employees By Roles?",
      "Add Department?",
      "Add Role?",
      "Update Employee?",
      "Add Employee?",
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

//============= View All Employees ==========================//
function ViewEmployees() {
  // console.log("success");
  connection.query(`SELECT employee_id,first_name,last_name,department.department_name,role.title,role.salary FROM employee
  INNER JOIN role ON role.role_id=employee.role_id
  INNER JOIN department ON department.department_id=role.department_id`, function (err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log("\n");
    console.table(res);
    start();
  });

}

//============= View Employees By Roles ==========================//
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
        connection.query(`SELECT role.title,employee_id,first_name,last_name,role.salary FROM employee
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


//============= View Employees By Departments ==========================//
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
        connection.query(`SELECT department.department_name,employee_id,first_name,last_name FROM employee
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

//============= Update Employee ==========================//
function UpdateEmployee() {
  // console.log(" i am in Update Employee");
  let roleResults = [], employeeResults = [];
  // Query Employees
  connection.query(`SELECT * FROM employee`, function (err, res) {
    if (err) throw err;
    employeeResults = [...res]; // Assign query results to employeeResults array
    // Query Roles
    connection.query(`SELECT * FROM role`, function (err, res) {
      if (err) throw err;
      roleResults = [...res]; // Assign query results to roleResults array
      // Now we can prompt user with employees info and roles info.
      inquirer.prompt([
        {
          name: "employee_full_name",
          type: "rawlist",
          message: "What employee would you like to update?",
          choices: employeeResults.map(employee => `${employee.first_name} ${employee.last_name}`) // Use map to only show name of employee
        },
        {
          name: "role_title",
          type: "rawlist",
          message: "What is the employee's new role?",
          choices: roleResults.map(role => role.title) // Use map to only show role title
        }
      ]).then(function (answer) {
        let { employee_id } = employeeResults.find(employee => `${employee.first_name} ${employee.last_name}` === answer.employee_full_name);
        let { role_id } = roleResults.find(role => role.title === answer.role_title);
        connection.query(`UPDATE employee SET role_id = ${role_id} WHERE employee_id=${employee_id}`, function (err, res) {
          if (err) throw err;
          console.log("\n");
          ViewEmployees();
        });
      });
    });
  });
}

//============= Add Employee ==========================//
function AddEmployee() {
  // console.log(" i am in AddEmployee");
  var roleQuery = "SELECT * FROM role;";
  connection.query(roleQuery, (err, res) => {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      displayRoleArray.push(res[i].title);
    }

    inquirer.prompt([
      {
        name: "firstName",
        type: "input",
        message: "What is the first name of the employee?",
      },
      {
        name: "lastName",
        type: "input",
        message: "What is the last name of the employee?",
      },
      {
        name: "choice",
        type: "list",
        message: "What is the Employee's role?",
        choices: displayRoleArray
      }

    ]).then(function (answer) {
      for (var i = 0; i < res.length; i++) {
        if (res[i].title === answer.choice) {
          temp = res[i].role_id;
        }
      }

      connection.query(`INSERT INTO employee (first_name,last_name,role_id)
                        VALUES("${answer.firstName}","${answer.lastName}","${temp}")`,
        (err) => {
          if (err) throw err;
          console.log(`Employee is Successfully added into the Database `);
          console.log("\n");
          ViewEmployees();
        })
    })
  })
}

//============= Add Employee Role ==========================//
function AddRole() {
  // console.log(" i am in addRole");
  // var roleQuery = "SELECT * FROM role;";
  var departmentQuery = "SELECT * FROM department;";
  // connection.query(roleQuery,(err,roles) => {
  connection.query(departmentQuery, (err, res) => {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      depRoleArray.push(res[i].department_name);
    }

    inquirer.prompt([
      {
        name: "addTitle",
        type: "input",
        message: "What is the title of the Role you want to add?"
      },
      {
        name: "addSalary",
        type: "input",
        message: "What is the salary of the Role ?"
      },
      {
        name: "choice",
        type: "list",
        message: "Which department this role belongs to?",
        choices: depRoleArray
      }

    ]).then(function (answer) {
      for (var i = 0; i < res.length; i++) {
        if (res[i].department_name === answer.choice) {
          temp = res[i].department_id;
        }
      }

      connection.query(`INSERT INTO role (title,salary,department_id)
                        VALUES("${answer.addTitle}","${answer.addSalary}","${temp}")`,
        (err) => {
          if (err) throw err;
          console.log(`This Role is Successfully added into the Database `);
          console.log("\n");
          viewRoles();
        })
    })
  })
}

//============= Add Department ==========================//
function AddDepartment() {
  // console.log(" i am in AddDepartment");
  inquirer.prompt(
    {
      name: "addDepart",
      type: "input",
      message: "What is the name of the department you want to add?"
    }
  ).then(function (answer) {
    connection.query(`SELECT EXISTS(SELECT * FROM department WHERE department_name="${answer.addDepart}") AS is_duplicate`, function (err, res) {
      if (err) {
        throw err;
      }
      else if (res[0].is_duplicate === 1) {
        console.log(`This Department is already existed in the DataBase.`);
        viewDepartments();
      }
      else if (res[0].is_duplicate === 0) {

        connection.query(`INSERT INTO department(department_name)
                        VALUES("${answer.addDepart}")`,
          (err, res) => {
            if (err) throw err;
            console.log(`This department is Successfully added into the Database `);
            console.log("\n");
            viewDepartments();
          }
        )
      }

    })
  })
}

//============= Delete Employee ==========================//
function DeleteEmployee() {
  // console.log(" i am in delete Employee");
  // ViewEmployees();
  connection.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      deleteArray.push(res[i].first_name);
    }
    inquirer.prompt(
      {
        name: "deleteEmployee",
        type: "list",
        message: "Which employee you want to delete?",
        choices: deleteArray
      }).then(function (answer) {

        connection.query(`DELETE FROM employee WHERE first_name="${answer.deleteEmployee}"`
          , function (err, res) {
            if (err) throw err;
            console.log("\n");
            ViewEmployees();
          });

      })
  })

}
// FUNCTION to select all the departments 
function viewDepartments() {
  connection.query(`SELECT * FROM department`, function (err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    start();
  });
}

// FUNCTION to select all the roles
function viewRoles() {
  connection.query(`SELECT role_id,title,salary FROM role`, function (err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log("\n");
    console.table(res);
    start();
  });
}

//============= End Connection ==========================//
function exit() {
  connection.end();
}