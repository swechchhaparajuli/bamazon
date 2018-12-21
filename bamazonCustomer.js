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
        if(err){
          console.log("Sorry, please try entering a different ID, your item does not exist");
        
        }
          if(res[0].item_id == answer.id){
            if((res[0].stock_quantity > answer.quantity) || (res[0].stock_quantity == answer.quantity)){
              console.log("That cost you: $" + res[0].price);
                decrementQuantity(answer.id, res[0].stock_quantity, answer.quantity);
              calcSales(res[0].item_id, parseInt(res[0].product_sales), parseInt(res[0].price), parseInt(res[0].quantity));
       
            }else{
              console.log("Sorry, insufficient quantity!");
              
            }
            //console.log(res);
          }
      });
    });
  }

  function decrementQuantity(i, q, temp){
  var query = connection.query(
    "UPDATE products SET ? WHERE ?",
    [
      { 
        stock_quantity: q-temp //set ? points here
      },
      {
        item_id: i //where ? points here
      }
    ],
    function(err, res) {

  });
}

function calcSales(i, pSales, price, quantity){
  var query = connection.query(
    "UPDATE products SET ? WHERE ?",
    [
      { 
        product_sales: pSales + (price * quantity) //set ? points here
      },
      {
        item_id: i //where ? points here
      }
    ],
    function(err, res) {
      show(); 
  });
}

function show(){
  var query = "SELECT * FROM products";
    connection.query(query, function(err, res) {
      var newTable = [{

          "Item ID" : res[0].item_id
      ,
      
          "Product Name" : res[0].product_name
      ,
      
          "Department Name" : res[0].department_name
      ,
      
          "Price" : res[0].price
      ,
      
          "Stock Quantity" : res[0].stock_quantity
      ,

          "Product Sales" : res[0].product_sales

      }];

      for (var i = 1; i < res.length; i++) {
          newTable.push(                
          {
                  "Item ID" : res[i].item_id
              ,
              
                  "Product Name" : res[i].product_name
              ,
              
                  "Department Name" : res[i].department_name
              ,
              
                  "Price" : res[i].price
              ,
              
                  "Stock Quantity" : res[i].stock_quantity
              ,
                  "Product Sales" : res[i].product_sales
      
          })
        }
        console.table(newTable);
        run();
    } );
}


