var inquirer = require("inquirer");
var mysql = require("mysql");
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
afterConnection();
});
function afterConnection() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        let length = res.length
    function questions(){
        inquirer.prompt([
            {
                type: "list",
                message: "Would you like to continue using Bamazon Manager",
                choices: ["Yes", "No"],
                name: "pick",
            },
        ]).then (function (answers){
            if (answers.pick === "Yes") {
                afterConnection();
            } else {
                connection.end();
            }
        })
    };
    inquirer.prompt([
        {
            type: "list",
            message: "Welcome to Bamazon Manager!",
            choices: ["View Inventory", "View Low Inventory", "Add to Inventory", "Add New Product"],
            name: "pick",
        },
        
    ]).then (function (answers){
        if (answers.pick === "View Inventory"){
            ViewProductsForSale();
        } else if (answers.pick === "View Low Inventory"){
            ViewLowInventory();

        } else if (answers.pick === "Add to Inventory"){
            AddStock();

        } else {
            newItem();
        }
    })

    function ViewProductsForSale() { 
            // Display Cart
            for (i = 0; i < length; i++) {
                console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | $" + res[i].price + " | " + res[i].stock_quantity);
            };
            questions();
    }

    function ViewLowInventory() {
        connection.query("SELECT * FROM products WHERE stock_quantity < 5", function (err, res) {
            if (err) throw err;
            let length = res.length
            // Display Cart
            for (i = 0; i < length; i++) {
                console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | $" + res[i].price + " | " + res[i].stock_quantity);
            };
            questions();
        })
    }
    function AddStock() {
        inquirer.prompt([
            {
                name: "ID",
                message: "What is the ID of the product you would like to increase stock?"
            }, {
                name: "Quantity",
                message: "How many units of the product would you like to increase the stock by?",
            }
        ])
            .then(function (answers) {
                var userId = parseInt(answers.ID);
                var userQuantity = parseInt(answers.Quantity);
                
                function checkID(pID) {
                    
                    if (pID <= length && pID > 0) {
                        console.log("Processing....");
                        StockUpdate();
                    } else {
                        console.log("Enter a valid ID please.");
                        AddStock();
                    }
                };
                checkID(userId);


                function StockUpdate() {
                    connection.query("SELECT * FROM products", function (err, res) {
                        if (err) throw err;
                    var newQuantity = res[userId].stock_quantity + userQuantity;
                        console.log(res[userId].stock_quantity);
                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: newQuantity
                            },
                            {
                                item_id: userId
                            }
                        ],
                        function (error) {
                            if (error) throw err;
                            console.log("Stock successfully updated!");
                            console.log("Quantity: " + newQuantity);
                            console.log("Id: " + userId);
                            questions();
                        }
                    );
                })
                }
            })
    }
    function newItem() {
        // prompt for info about the item being put up for auction
        inquirer
          .prompt([
            {
              name: "product",
              type: "input",
              message: "What is the product you would like to add?"
            },
            {
              name: "department",
              type: "input",
              message: "What department would you like to place your product in?"
            },
            {
              name: "price",
              type: "input",
              message: "How much will does the product cost?",
              validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                return false;
              }
            },
            {
              name: "quantity",
              type: "input",
              message: "How many units do you have to sell?",
              validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                return false;
              }
            }
          ])
          .then(function(answer) {
            // when finished prompting, insert a new item into the db with that info
            connection.query(
              "INSERT INTO products SET ?",
              {
                product_name: answer.product,
                department_name: answer.department,
                price: answer.price || 0,
                stock_quantity: answer.quantity || 0
              },
              function(err) {
                if (err) throw err;
                console.log("The new product has sucessfully entered our system!");
                questions();
              }
            );
          });
      }
})
}






