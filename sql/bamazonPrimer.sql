USE bamazon_db;

INSERT INTO products 
(item_id, product_name, department_name, price, stock_quantity)
VALUE
(FLOOR(RAND()*90000+10000), 'Roomba', 'Household', 499.99, 25),
(FLOOR(RAND()*90000+10000), 'iPhone', 'Electronics', 1099.99, 49),
(FLOOR(RAND()*90000+10000), 'Coffee Maker', 'Kitchen', 250.00, 38),
(FLOOR(RAND()*90000+10000), 'Hair Dryer', 'Health & Beauty', 49.78, 82),
(FLOOR(RAND()*90000+10000), 'Kitchen Aid Mixer', 'Kitchen', 299.99, 3),
(FLOOR(RAND()*90000+10000), 'Shark Vacuum', 'Household', 278.99, 14),
(FLOOR(RAND()*90000+10000), 'Makeup Set', 'Health & Beauty', 35.99, 125),
(FLOOR(RAND()*90000+10000), 'Camera', 'Electronics', 899.99, 12),
(FLOOR(RAND()*90000+10000), 'Toaster', 'Kitchen', 499.99, 25),
(FLOOR(RAND()*90000+10000), 'Android', 'Electronics', 799.99, 42);

INSERT INTO departments
(department_name, over_head_costs)
VALUE
('Household', 1337),
('Electronics', 2234),
('Kitchen', 345),
('Health & Beauty', 2498);

ALTER TABLE products
ADD COLUMN product_sales DECIMAL(10,2) NOT NULL DEFAULT 0;

