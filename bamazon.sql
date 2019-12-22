DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;


CREATE TABLE products (
    item_id INT(5) NOT NULL,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(30) NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT(5) NOT NULL
);

SELECT * FROM products;