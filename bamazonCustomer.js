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
    // Display Cart
    for (i = 0; i < length; i++) {
      console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | $" + res[i].price + " | " + res[i].stock_quantity);
    };
    
    inquirer.prompt([
      {
        name: "ID",
        message: "What is the ID of the product you would like to buy?"
      }, {
        name: "Quantity",
        message: "How many units of the product would you like to buy?",

      }
    ])
    .then(function (answers) {

      var userId = parseInt(answers.ID) - 1;
      var userQuantity = parseInt(answers.Quantity);
      checkID(userId);
      
      // Checking if ID is Valid
      function checkID(pID) {
        if (pID <= length && pID > 0) {
          console.log("Processing your order....");
          console.log("There are " + res[userId].stock_quantity + " " + res[userId].product_name + " in stock");
          checkQuan(userId, userQuantity);
        } else {
          console.log("Enter a valid ID please.");
          afterConnection();
        }
      };
      
      function checkQuan(pID, pQuantity) {
        var total = res[userId].price * userQuantity;

        if (pQuantity <= res[pID].stock_quantity) {
          console.log("You choose to buy " + userQuantity + " " + res[userId].product_name + "'s.");
          stockUpdate();
          console.log("Your total will be $" + total + ".");
        } else {
          console.log("Insufficient quantity!")
          afterConnection();
        }
      };
      function stockUpdate(){
        connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        var newQuantity = res[userId].stock_quantity - userQuantity;
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
          function(error) {
            if (error) throw err;
            console.log("Order placed successfully!");
            console.log(newQuantity);
            connection.end();
   
          }
        );
        })
      }
    });
  });
}