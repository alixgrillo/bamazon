var inquirer = require('inquirer');
var mysql = require('mysql');
var Table = require('cli-table');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: 'root',
    password: 'R2wwsi!!',
    database: 'bamazon_db'
});

connection.connect(function (err) {
    if (err) throw err;
    //console.log(results);
    start();
});

function start() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        var table = new Table({
            dafaultOnValue: 0,
            errorOnNull: false,
            head: ['Product ID', 'Product Name', 'Department', 'Price'],
            colWidths: [20, 25, 25, 25]
        });
 
        for (var i = 0; i < results.length; i++) {
            table.push(
                [results[i].item_id, results[i].product_name, results[i].department_name, "$" + results[i].price]
            );
        };

        console.log(table.toString());
        sellProduct();
    });
}

function sellProduct() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        inquirer.prompt([
            {
                message: "What product would you like to buy?",
                type: 'list',
                choices: function () {
                    var choiceArray = [];
                    for (var i = 0; i < results.length; i++) {
                        choiceArray.push(results[i].item_id + " (" + results[i].product_name + ")");
                    }
                    choiceArray.push("Stop Shopping!");
                    return choiceArray;
                },
                name: 'product'
            }
        ]).then(function (answer) {
            var prodID = answer.product.slice(0, 5);
            var prodQuantity = 0;
            if (answer.product === "Stop Shopping!") {
                connection.end();
                return
            }
            inquirer.prompt([
                {
                    message: "How many would you like to buy?",
                    type: 'input',
                    name: 'quantity'
                }
            ]).then(function (quantityAnswer) {
                connection.query('SELECT * FROM products WHERE item_id = ?', [prodID], function (err, result) {
                    if (err) throw err;
                    prodQuantity = result[0].stock_quantity;
                    if (prodQuantity - quantityAnswer.quantity < 0) {
                        console.log("Insufficient Quantity");
                        sellProduct();
                    } else {
                        connection.query('UPDATE products SET stock_quantity=? WHERE item_id=?',
                            [prodQuantity - quantityAnswer.quantity, prodID], function (err, result) {
                                if (err) throw err;
                                console.log("Purchase successful");
                                sellProduct();
                        });
                    }
                })
            })
        })
    })

}