DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(80) NULL,
    department_name VARCHAR(50) NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT NOT NULL,
    product_sales INT NOT NULL,
    PRIMARY KEY (item_id)
);

CREATE TABLE departments(
    department_id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(80) NULL,
    over_head_costs INT NOT NULL,
    PRIMARY KEY (department_id)
);


INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
    VALUES("iPhone", "electronics", 1000, 45, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
    VALUES("Android", "electronics", 650, 25, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
    VALUES("Polar Insulated Bottle", "dishes", 7, 345, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
    VALUES("Sneakers", "shoes", 25, 87, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
    VALUES("Winter Boots", "shoes", 84, 15, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
    VALUES("Red Nail Polish", "cosmetics", 1000, 45, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
    VALUES("Fenty Foundation", "cosmetics", 650, 25, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
    VALUES("Morphe Pallete", "cosmetics", 7, 345, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
    VALUES("Nyx Matte Lipstick", "cosmetics", 25, 87, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
    VALUES("Contigo Coffee Mug", "dishes", 84, 15, 0);


USE bamazon_db;

SELECT * FROM products;



