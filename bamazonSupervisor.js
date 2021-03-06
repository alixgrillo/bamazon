require("dotenv").config();

var inquirer = require('inquirer');
var mysql = require('mysql');
var Table = require('cli-table');

var password = process.env.SQL_PASSWORD;

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: 'root',
    password: password,
    database: 'bamazon_db'
});

connection.connect(function (err) {
    if (err) throw err;
    //console.log(results);
    start();
});

function start() {
    inquirer.prompt([
        {
            message: "What would you like to do?",
            type: "list",
            choices: ['View Product Sales by Department', 'Add New Department', 'Completed Work'],
            name: 'supervisorTask'
        }
    ]).then(function (answer) {
        switch (answer.supervisorTask) {
            case 'View Product Sales by Department':
                viewProductsByDept();
                break;
            case 'Add New Department':
                addDepartment();
                break;
            case 'Completed Work':
                connection.end();
                break;
        }
    })
}

function viewProductsByDept(){
    connection.query("SELECT d.department_id, d.department_name, d.over_head_costs, SUM(p.product_sales) AS product_sales, (SUM(p.product_sales) - d.over_head_costs) AS total_profit FROM products p RIGHT JOIN departments d ON p.department_name = d.department_name GROUP BY d.department_id;", function (err, results) {
        if (err) throw err;
        var table = new Table({
            dafaultOnValue: 0,
            errorOnNull: false,
            head: ['Department ID', 'Department Name', 'Over Head Costs', 'Total Sales', 'Total Profit'],
            colWidths: [20, 20, 20, 20, 20]
        });
        for (var i = 0; i < results.length; i++) {
            var prodSales = results[i].product_sales;
            if(prodSales === null){prodSales=0;}
            var totProfit = results[i].total_profit;
            if(totProfit === null){totProfit=prodSales - results[i].over_head_costs;}
            table.push(
                [results[i].department_id, results[i].department_name, "$" + results[i].over_head_costs, "$" + prodSales, "$" + totProfit]
            );
        };
        console.log('\n'+table.toString());
        start();
    });
}

function addDepartment(){
    inquirer.prompt([
        {
            message: "What is the name of the department you would like to add?",
            type: 'input',
            name: 'name'
        },
        {
            message: "What are the overhead costs for this department?",
            type: "input",
            name: "overhead"
            
        }
    ]).then(function(answer){
        connection.query("INSERT INTO departments (department_name, over_head_costs) VALUE (?, ?);", 
        [answer.name, answer.overhead], 
        function(err, results){
            if(err) throw err;
            console.log(answer.name + " successfully added to the department list");
            start();
        })
    })
}