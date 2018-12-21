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
          "View Products for Sale",
          "View Low Inventory",
          "Add to Inventory",
          "Add New Product",
        ]
      })
      .then(function(answer) {
        switch (answer.action) {
            case "View Products for Sale":
              viewSales();
              break;

            case "View Low Inventory":
              viewLowInventory();
              break;

            case "Add to Inventory":
              addItems();
              break;

            case "Add New Product":
              addNewProd();
              break;
        }
    });
}

function viewSales(){
    var query = "SELECT * FROM products";
      connection.query(query, function(err, res) {
        if (err) throw err;
          for (var i = 0; i<res.length; i++){
              if (res[i].stock_quantity > 0){
                console.log(res[i]);
              }
          }
      });
}

function viewLowInventory(){
    var foundLowInventory = false;
    var query = "SELECT * FROM products";
      connection.query(query, function(err, res) {
        if (err) throw err;
          for (var i = 0; i< 10; i++){
              if (res[i].stock_quantity < 5){
                foundLowInventory = true;
                console.log(res[i]);
              }
          }
          if(!foundLowInventory){
              console.log("No low inventory!");
          }
      });
}

function addItems(){
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
            }
        });
    });
}


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
        var query = "INSERT INTO products (product_name ,department_name, price, stock_quantity, product_sales) VALUES (?)";
        var values = [answer.name, answer.dept, parseInt(answer.price), parseInt(answer.quantity), 0];
        connection.query(
            query, [values],
                function(err, res) {
                    if (err) throw err;
                show();
                }
        );
    });
}

function incrementQuantity(i, q){
    var query = connection.query(
      "UPDATE products SET ? WHERE ?",
      [
        { 
          stock_quantity: q //set ? points here
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
            "Product Sales" : parseInt(res[0].product_sales)

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
                    "Product Sales" : parseInt(res[i].product_sales)
        
            })
          }
          console.table(newTable);
          runManage();
      } );
  }