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

connection.connect(function(err){
    if (err) throw err;
    //console.log(results);
    start();
});

function start(){
    connection.query("SELECT * FROM products", function (err, results){
        if (err) throw err;
        var table = new Table({
            dafaultOnValue: 0,
            errorOnNull: false,
            head: ['Product ID', 'Product Name', 'Department', 'Price'],
            colWidths: [20, 25, 25, 25]
        });
        var prodArr = [];
        for(var i=0; i<results.length; i++){
            table.push(
                [results[i].item_id, results[i].product_name, results[i].department_name, "$"+results[i].price]
            );
            prodArr.push({
                id: results[i].item_id,
                name: results[i].product_name
            });
        }
        console.log(table.toString());
        sellProduct(prodArr);
    });
}

function sellProduct(prodArr){
    inquirer.prompt([
        {
            message: "What product would you like to buy?",
            type: 'list',
            choices: function(){
                var choiceArr=[];
                for (var i =0; i<prodArr.length; i++){
                    choiceArr.push(prodArr[i].id + " (" + prodArr[i].name + ")");
                }
                return choiceArr;
            },
            name: 'product'
        },
        {
            message: "How many would you like to buy?",
            type: 'input',
            name: 'quantity'
        }
    ]).then(function(answer){
        var prodID = answer.product.slice(0,5);
        var prodQuantity = 0;
        connection.query('SELECT * FROM products WHERE item_id = ?', [prodID], function(err, result){
            if (err) throw err;
            prodQuantity = result[0].stock_quantity;
            if(prodQuantity - answer.quantity < 0){
                console.log("Insufficient Quantity");
                start();
            } else {
                connection.query('UPDATE products SET stock_quantity=? WHERE item_id=?', 
                [prodQuantity-answer.quantity, prodID], function (err, result){
                    if(err) throw err;
                    console.log("Purchase successful");
                    start();
                });
            }
        })
    })
}