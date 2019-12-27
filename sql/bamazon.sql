DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;


CREATE TABLE products (
    item_id INT(5) NOT NULL,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(30) NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT(5) NOT NULL,
    PRIMARY KEY(item_id)
);

SELECT * FROM products;

CREATE TABLE departments (
    department_id INT(5) NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(30) NULL,
    over_head_costs INT(10),
    PRIMARY KEY(department_id)
);

SELECT * FROM departments;