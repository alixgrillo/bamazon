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

function start(){
    inquirer.prompt([
        {
            message: "What would you like to do?",
            type: "list",
            choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product', 'Completed Work'],
            name: 'managerTask'
        }
    ]).then(function(answer){
        switch(answer.managerTask){
            case 'View Products for Sale':
                viewProducts();
                break;
            case 'View Low Inventory':
                lowInventory();
                break;
            case 'Add to Inventory':
                addToInventory();
                break;
            case 'Add New Product':
                addProduct();
                break;
            case 'Completed Work':
                connection.end();
                break;
        }
    })
}

function viewProducts(){
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        var table = new Table({
            dafaultOnValue: 0,
            errorOnNull: false,
            head: ['Product ID', 'Product Name', 'Department', 'Price', 'Inventory'],
            colWidths: [20, 20, 20, 20, 20]
        });
 
        for (var i = 0; i < results.length; i++) {
            table.push(
                [results[i].item_id, results[i].product_name, results[i].department_name, "$" + results[i].price, results[i].stock_quantity]
            );
        };
        console.log('\n'+table.toString());
        start();
    });
    
}

function lowInventory(){
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function (err, results) {
        if (err) throw err;
        if (results.length ===0){
            console.log("All products have sufficient quantity");
        } else {
            var table = new Table({
                dafaultOnValue: 0,
                errorOnNull: false,
                head: ['Product ID', 'Product Name', 'Department', 'Price', 'Inventory'],
                colWidths: [20, 20, 20, 20, 20]
            });
     
            for (var i = 0; i < results.length; i++) {
                table.push(
                    [results[i].item_id, results[i].product_name, results[i].department_name, "$" + results[i].price, results[i].stock_quantity]
                );
            };
            console.log('\n'+table.toString());
            start();
        }   
    });
}

function addToInventory(){
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        inquirer.prompt([
            {
                message: "What product would you like add inventory?",
                type: 'list',
                choices: function () {
                    var choiceArray = [];
                    for (var i = 0; i < results.length; i++) {
                        choiceArray.push(results[i].item_id + " (" + results[i].product_name + ")");
                    }
                    return choiceArray;
                },
                name: 'product'
            },
            {
                message: "How many would you like to add?",
                type: 'input',
                name: 'quantity'
            }
        ]).then(function (answer) {
            var prodID = answer.product.slice(0, 5);
            var prodQuantity = answer.quantity;
            connection.query("SELECT stock_quantity FROM products WHERE item_id=?", [prodID], function(err, results){
                if(err) throw err;
                var currQuantity = results[0].stock_quantity;
                connection.query("UPDATE products SET stock_quantity=? WHERE item_id=?", [parseInt(currQuantity) + parseInt(prodQuantity), 
                prodID], function(err, results){
                    if(err) throw err;
                    console.log("Success. " + prodQuantity + " items have been added");
                    start();
                });
            });
        });
    });
}

function addProduct(){
    inquirer.prompt([
        {
            message: "What is the name of the product you would like to add?",
            type: 'input',
            name: 'name'
        },
        {
            message: "What department does this belong to?",
            type: "input",
            name: "department"
        }, 
        {
            message: "What is the price of the product?",
            type: "input",
            name: "price"
        },
        {
            message: "What is the current inventory of this product?",
            type: "input",
            name: "quantity"
        }
    ]).then(function(answer){
        var rand = Math.floor(Math.random()*90000+10000);
        connection.query("INSERT INTO products (item_id, product_name, department_name, price, stock_quantity) VALUE (?, ?, ?, ?, ?);", 
        [rand, answer.name, answer.department, answer.price, answer.quantity], 
        function(err, results){
            if(err) throw err;
            console.log(answer.name + " successfully added to the product list");
            start();
        })
    })
}

