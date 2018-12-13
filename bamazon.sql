DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(80) NULL,
    department_name VARCHAR(50) NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY (item_id)
);


INSERT INTO products (product_name, department_name, price, stock_quantity)
    VALUES("iPhone", "electronics", 1000, 45);

INSERT INTO products (product_name, department_name, price, stock_quantity)
    VALUES("Android", "electronics", 650, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
    VALUES("Polar Insulated Bottle", "dishes", 7, 345);

INSERT INTO products (product_name, department_name, price, stock_quantity)
    VALUES("Sneakers", "shoes", 25, 87);

INSERT INTO products (product_name, department_name, price, stock_quantity)
    VALUES("Winter Boots", "shoes", 84, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
    VALUES("Red Nail Polish", "cosmetics", 1000, 45);

INSERT INTO products (product_name, department_name, price, stock_quantity)
    VALUES("Fenty Foundation", "cosmetics", 650, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
    VALUES("Morphe Pallete", "cosmetics", 7, 345);

INSERT INTO products (product_name, department_name, price, stock_quantity)
    VALUES("Nyx Matte Lipstick", "cosmetics", 25, 87);

INSERT INTO products (product_name, department_name, price, stock_quantity)
    VALUES("Contigo Coffee Mug", "dishes", 84, 15);


USE bamazon_db;
SELECT * FROM products;


