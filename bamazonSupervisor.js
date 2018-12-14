var mysql = require("mysql2");
var inquirer = require("inquirer");
var clc = require("cli-color");


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
  runManage();
});

function runManage() {
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


/*function createNewDept(){
    inquirer
    .prompt([{
        name: "id",
        type: "input",
        message: "What is the id of the product you are trying to add?"
    },
    {
        name: "quantity",
        type: "input",
        message: "How many of this product are you trying to add?"
    }]).then(function(answer) {
        var query = "SELECT * FROM products WHERE item_id IN (?)";
        connection.query(query, [answer.id], function(err, res) {
            if (err) throw err;
            if(res[0].item_id == answer.id){
                incrementQuantity(answer.id, (parseInt(res[0].stock_quantity)+parseInt(answer.quantity)));
            }else{
              console.log("Sorry, this item does not exist!");
              run();
            }
        });
    });
}*/

function addNewProd(){
    inquirer
    .prompt([{
        name: "name",
        type: "input",
        message: "What is the name of the new product you would like to add?"
    },
    {
        name: "dept",
        type: "input",
        message: "What department would this product be in?"
    },
    {
        name: "price",
        type: "input",
        message: "How much would you like to sell this product for?"
    },
    {
        name: "quantity",
        type: "input",
        message: "How many units would you like to add?"
      }
    ])
    .then(function(answer) {
        var query = "INSERT INTO products (product_name ,department_name, price, stock_quantity) VALUES (?)";
        var values = [answer.name, answer.dept, parseInt(answer.price), parseInt(answer.quantity)];
        connection.query(
            query, [values],
                function(err, res) {
                    if (err) throw err;
                show();
                }
        );
    });
}

  function viewSales(){
    var query = "SELECT * FROM departments";
      connection.query(query, function(err, res) {
          console.log("department_id  |  department_name   |  over_head_costs   |  product_sales   |  total_profit")
        for (var i = 0; i < res.length; i++) {
            console.log(
                " " +
                res[i].department_id +
                "  ||  " +
                res[i].department_name +
                " || $" +
                res[i].over_head_costs +
                " || $" +
                "product_sales" +
                " || $" +
                0-res[i].over_head_costs
            );
          }
      });
  }