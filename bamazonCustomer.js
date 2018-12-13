var mysql = require("mysql2");
var inquirer = require("inquirer");
var clc = require("cli-color");

greatBayItem = function(name, department, price) {
    this.name = name;
    this.department = department;
    this.price = price; //stores highest bid for this item
}

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
  run();
});

function run() {
  inquirer
    .prompt([{
      name: "id",
      type: "input",
      message: "What is the id of the product you want to buy?"
      },
      {
        name: "quantity",
        type: "input",
        message: "How many units would you like to buy?"
      }
    ])
    .then(function(answer) {
      var query = "SELECT * FROM products WHERE item_id IN (?)";
      connection.query(query, [answer.id], function(err, res) {
        console.log(res[0].item_id);
        console.log(res[0].stock_quantity);
          if(res[0].item_id == answer.id){
            if((res[0].stock_quantity > answer.quantity) || (res[0].stock_quantity == answer.quantity)){
              decrementQuantity(answer.id);
            }else{
              console.log("Sorry, insufficient quantity!");
              run();
            }
            //console.log(res);
          }else{
            console.log("Sorry, this item does not exist!");
            run();
          }
      });
    });
  }

  function decrementQuantity(i){
    console.log("decremented BB");
    break;
  }

  function addForSale(){

  }

  function sellItem(){
    inquirer
    .prompt({
      name: "username",
      message: "Enter your username: "
    },

    {
      name: "password",
      message: "Enter your password: "
    },
    {
      name: "itemName",
      message: "Enter the name of the item you would like to sell: "
    
    }).then(function(answer){

    });
  }
