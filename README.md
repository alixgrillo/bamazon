# bamazon
A CLI product purchasing app

Purchase products, review inventory, and track sales for this pseudo-online store. 

## Table of Contents
* [About](#about)
* [Functionality](#functionality)
* [Technical Features](#technical-features)
* [Requirements](#requirements)
* [Build Tools](#build-tools)
* [Acknowledgements](#acknowledgements)


## About
This command-line only application will allow a user to purchase a product if they are a customer. If the user is a manager,
they can view all products or just those with low inventory as well as add inventory or new products. The supervisor user can 
view all products and sales by department.

## Functionality
Please note that all inquirer options have a stop option either `Stop Shopping` or `Completed Work` in order to stop the connection.

### Customer View
Start the program by running `node bamazonCustomer.js` in the command line in the directory of the file. The following screenshots show
the results of each function.

* View and decide which product to buy
<!-- <img src="/images/movie-input.gif"> -->

* Specify how many to buy
<!-- <img src="/images/movie-no-input.gif"> -->

* Purchase Successful
<!-- <img src="/images/concert-input.gif"> -->

* Insufficient Quantity
<!-- <img src="/images/concert-no-input.gif"> -->

### Manager View
Start the program by running `node bamazonManager.js` in the command line in the directory of the file. The following screenshots show
the results of each function.
* View Products for Sale
<!-- <img src="/images/song-input.gif"> -->

* View Low Inventory
<!-- <img src="/images/song-no-input.gif"> -->

* Add Inventory
<!-- <img src="/images/random.gif"> -->

* Add a New Product
<!-- <img src="/images/log.gif"> -->

* View Products for Sale showing New Product
<!-- <img src="/images/log.gif"> -->

### Supervisor View
Start the program by running `node bamazonSupervisor.js` in the command line in the directory of the file. The following screenshots show the results of each function. Note: the supervisor table is a `JOIN` between two tables - I considered this a `RIGHT JOIN` favoring
the departments so that all departments would be shown regardless if they have any registered products.
* View Products for Sale by Department
<!-- <img src="/images/song-input.gif"> -->

* Add New Department
<!-- <img src="/images/song-no-input.gif"> -->

## Technical Features
* This is a command-line only application.
* The `inquirer` package prompts the user to decide what action to take.
* This application requires a connection to MySQL in order to make use of the database. Please see [Requirements](#requirements) for information on how to download and connect.
* To format the table, I used the `npm cli-table` package.

## Requirements
In order to run, you will need to clone or fork this repository to your local machine. You will need to run:
`npm install`
in the local folder.

In order to run, you will want to prime your database:
   * Step One: Open MySQL Workbench. You will want to be sure you are connected to a root database using port 3306. If the port is different, then the code will need to be altered.

   * Step Two: Run the script in `bamazon.sql`. This will setup two empty tables that will hold all of the information. Note: once you have loaded data, you will not want to run this again as it will drop any existing database.

   * Step Three: To prime the database with some initial data, run `bamazonPrimer.sql`. This will load 10 initial products and 4 initial departments.

  * Step Five: Create a file named `.env`, add the following to it, replacing the comment with your `root` password to MySQL (no quotes):

```js
# SQL Password

SQL_PASSWORD = //enter password here - no quotes are needed

```

## Build Tools
* Node.js v10.16.3
* Node packages:
  * cli-table v0.3.1 (https://www.npmjs.com/package/cli-table)
  * dotenv v8.2.0 (https://www.npmjs.com/package/dotenv)
  * inquirer v.7.0.1 (https://npmjs.com/package/inquirer)
  * mysql v.2.17.1 (https://www.npmjs.com/package/mysql)


## Acknowledgements
* Thanks to all of the authors of Node.js packages - they are invaluable.