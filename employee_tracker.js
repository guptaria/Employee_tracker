var mysql = require("mysql");
const inquirer = require("inquirer");

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
      "View all Employee By Deparments?",
      "Update Employee?",
      "Add Employee?",
      "Add Role?",
      "Add Department?"
    ]

  }).then(function (answer) {
    switch(answer.actions){
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
        case "EXIT":
        exit();
        break;
       

    }
  
  });
}

function ViewEmployees() {
  // console.log("success");
   connection.query("SELECT * FROM employee", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    // 
    start();
  });

}

function ViewEmployeesByRoles(){
  console.log(" i am in ViewEmployeesByRoles");
  start();
}

function ViewEmployeesByDepartments(){
  console.log(" i am in ViewEmployeesByDepartments");
  start();
}

function UpdateEmployee(){
  console.log(" i am in Update Employee");
  start();
}

function AddEmployee(){
  console.log(" i am in AddEmployee");
  start();
}

function AddRole(){
  console.log(" i am in AddRole");
  start();
}
function AddDepartment(){
  console.log(" i am in AddDepartment");
  start();
}

function exit(){
  connection.end();
}

// function createProduct() {
//   console.log("Inserting a new product...\n");
//   var query = connection.query(
//     "INSERT INTO auctions SET ?",
//     {    
//   item_name:"T-shirt",
//   category :"clothing",
//   starting_bid :30,
//   highest_bid :40
//     },
//     function(err, res) {
//       if (err) throw err;
//       console.log(res.affectedRows + " product inserted!\n");
//       // Call updateProduct AFTER the INSERT completes
//       updateProduct();
//     }
//   );

//   // logs the actual query being run
//   console.log(query.sql);
// }

// function updateProduct() {
//   console.log("Updating all T-shitrs  starting bid ...\n");
//   var query = connection.query(
//     "UPDATE auctions SET ? WHERE ?",
//     [
//       {
//         starting_bid: 20
//       },
//       {
//         item_name: "T-shirt"
//       }
//     ],
//     function(err, res) {
//       if (err) throw err;
//       console.log(res.affectedRows + " products updated!\n");
//       // Call deleteProduct AFTER the UPDATE completes
//       deleteProduct();
//     }
//   );

//   // logs the actual query being run
//   console.log(query.sql);
// }

// function deleteProduct() {
//   console.log("Deleting all bids having id 1 ...\n");
//   connection.query(
//     "DELETE FROM auctions WHERE ?",
//     {
//       id:1 
//     },
//     function(err, res) {
//       if (err) throw err;
//       console.log(res.affectedRows + " products deleted!\n");
//       // Call readProducts AFTER the DELETE completes
//       readProducts();
//     }
//   );
// }





