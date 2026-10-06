CREATE DATABASE RetailStore;

USE RetailStore;

CREATE TABLE suppliers(
    supplier_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    supplier_name VARCHAR(100) NOT NULL,
    contact_email VARCHAR(20) NOT NULL
);

CREATE TABLE products(
    product_id INT PRIMARY KEY AUTO_INCREMENT  NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT NOT NULL,
    supplier_id INT,
    FOREIGN KEY (supplier_id) REFERENCES suppliers(supplier_id)
);

CREATE TABLE sales(
    sale_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    product_id INT,
    quantity_sold INT NOT NULL,
    sale_date DATE NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);