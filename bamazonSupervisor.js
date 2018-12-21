const mysql = require("mysql2");
const cTable = require('console.table');
const inquirer = require("inquirer");
const clc = require("cli-color");


var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Apoorva@2019",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  runSupervise();
});

function runSupervise() {
    inquirer
      .prompt({
        name: "action",
        type: "rawlist",
        message: "Menu Options: ",
        choices: [
          "View Product Sales by Department",
          "Create New Department"
        ]
      })
      .then(function(answer) {
        switch (answer.action) {
            case "View Product Sales by Department":
              viewSales();
              break;

            case "Create New Department":
                createNewDept();
              break;
        }
    });
}

function createNewDept(){
    inquirer
    .prompt([{
        name: "name",
        type: "input",
        message: "What is the name of the new department you would like to add?"
    },
    {
        name: "overhead",
        type: "input",
        message: "What is the over head costs of this department?"
    }
    ])
    .then(function(answer) {
        var query = "INSERT INTO departments (department_name, over_head_costs) VALUES (?)";
        var values = [answer.name, parseInt(answer.overhead)];
        connection.query(
            query, [values],
                function(err, res) {
                    if (err) throw err;
                }
        );
    });
}

function fillDepartmentInfo(){
    console.log("this part is under construction");
}

  function viewSales(){
    fillDepartmentInfo();
    var query = "SELECT * FROM departments";
    query += " INNER JOIN products ON products.department_name = departments.department_name";
      connection.query(query, function(err, res) {
        var newTable = [{
            "department_id" : res[0].department_id
        ,
        
            "department_name" : res[0].department_name
        ,
        
            "over_head_costs" : res[0].over_head_costs
        ,
        
            "product_sales" : res[0].product_sales
        ,
        
            "total_profit" : parseInt(res[0].product_sales)-parseInt(res[0].over_head_costs)
        }];

        for (var i = 1; i < res.length; i++) {
            newTable.push(                
            {
                "department_id" : res[i].department_id
            ,
            
                "department_name" : res[i].department_name
            ,
            
                "over_head_costs" : res[i].over_head_costs
            ,
            
                "product_sales" : res[i].product_sales
            ,
            
                "total_profit" : parseInt(res[i].product_sales)-parseInt(res[i].over_head_costs)
            })
          }
          console.table(newTable);

      } );
      runSupervise();
  }