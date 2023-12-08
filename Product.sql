CREATE DATABASE ECommerce;
USE ECommerce;

CREATE TABLE PRODUCTS (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    description TEXT,
    image_url VARCHAR(255)
);

CREATE TABLE ORDERS (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    total_amount DECIMAL(10,2),
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES USERS(id)
);

CREATE TABLE ORDER_DETAILS (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES ORDERS(id),
    FOREIGN KEY (product_id) REFERENCES PRODUCTS(id)
);

INSERT INTO ORDERS (user_id, total_amount) VALUES (1, 100.00);

SET @lastOrderId = LAST_INSERT_ID();

INSERT INTO ORDER_DETAILS (order_id, product_id, quantity, price) VALUES
(@lastOrderId, 1, 2, 50.00), 
(@lastOrderId, 2, 1, 30.00);  


CREATE TABLE PaymentInformation (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    payment_date DATE NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL,
    proof_of_payment LONGBLOB NOT NULL
);