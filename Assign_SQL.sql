CREATE DATABASE inventory_db;
USE inventory_db;

CREATE TABLE categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT
);
DESC categories;

CREATE TABLE suppliers (
    supplier_id INT AUTO_INCREMENT PRIMARY KEY,
    supplier_name VARCHAR(100) NOT NULL,
    contact_email VARCHAR(100),
    phone VARCHAR(20)
);
DESC suppliers;

CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    category_id INT,
    supplier_id INT,
    price DECIMAL(10,2) CHECK (price >= 0),
    stock_quantity INT CHECK (stock_quantity >= 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_category
        FOREIGN KEY (category_id) REFERENCES categories(category_id),

    CONSTRAINT fk_supplier
        FOREIGN KEY (supplier_id) REFERENCES suppliers(supplier_id)
);
DESC products;

INSERT INTO categories (category_name, description) VALUES
('Electronics', 'Devices and gadgets'),
('Books', 'Printed and digital books'),
('Clothing', 'Apparel and accessories');
SELECT * FROM categories;

INSERT INTO suppliers (supplier_name, contact_email, phone) VALUES
('Best Supplier Inc.', 'contact@bestsupplier.com', '123-456-7890'),
('Global Goods', 'sales@globalgoods.com', '987-654-3210');
SELECT * FROM suppliers;

INSERT INTO products (product_name, category_id, supplier_id, price, stock_quantity) VALUES
('Smartphone Model X', 1, 1, 699.99, 50),
('Wireless Headphones', 1, 2, 199.99, 30),
('Mystery Novel', 2, 1, 14.99, 100),
('T-shirt Classic', 3, 2, 9.99, 200),
('E-reader', 1, 1, 129.99, 10);
SELECT * FROM products;

# part-1 a)
SELECT product_name,(SELECT category_name FROM categories WHERE categories.category_id = products.category_id) AS category_name,
    (SELECT supplier_name FROM suppliers WHERE suppliers.supplier_id = products.supplier_id) AS supplier_name FROM products;
#b)
SELECT product_name, stock_quantity FROM products WHERE stock_quantity < 5;
#c)
ALTER TABLE products ADD COLUMN discount_percent INT DEFAULT 0;
DESC products;
#d)
UPDATE products SET price = price * 0.85 WHERE category_id = (SELECT category_id FROM categories WHERE category_name = 'Electronics');

#part-2 a)
SELECT p.product_name, c.category_name FROM products p INNER JOIN categories c ON p.category_id = c.category_id;
#b)
SELECT p.product_name, c.category_name FROM products p LEFT JOIN categories c ON p.category_id = c.category_id;
#c)
SELECT p.product_name, s.supplier_name FROM products p LEFT JOIN suppliers s ON p.supplier_id = s.supplier_id;
#d)
SELECT s.supplier_name, p.product_name FROM products p RIGHT JOIN suppliers s ON p.supplier_id = s.supplier_id;
#e)
SELECT product_name FROM products WHERE supplier_id IS NULL;
#f)
SELECT p.product_name, c.category_name, s.supplier_name FROM products p JOIN categories c ON p.category_id = c.category_id JOIN suppliers s ON p.supplier_id = s.supplier_id;
#g)
SELECT s.supplier_name, c.category_name FROM suppliers s LEFT JOIN products p ON s.supplier_id = p.supplier_id LEFT JOIN categories c ON p.category_id = c.category_id
UNION
SELECT s.supplier_name, c.category_name FROM categories c LEFT JOIN products p ON c.category_id = p.category_id LEFT JOIN suppliers s ON p.supplier_id = s.supplier_id;
#h)
SELECT p.product_name, s.contact_email FROM products p JOIN suppliers s ON p.supplier_id = s.supplier_id WHERE s.contact_email IS NOT NULL;
#i)
SELECT DISTINCT c.category_name FROM categories c JOIN products p ON c.category_id = p.category_id JOIN suppliers s ON p.supplier_id = s.supplier_id
WHERE s.supplier_name = 'Global Goods';

# part-c  f)
SELECT AVG(price) AS average_price
FROM products;
#g)
SELECT 
    MAX(price) AS max_price,
    MIN(price) AS min_price
FROM products
WHERE category_id = (
    SELECT category_id
    FROM categories
    WHERE category_name = 'Electronics'
);
#i)
SELECT DISTINCT supplier_name
FROM suppliers
WHERE supplier_id IN (
    SELECT supplier_id
    FROM products
    WHERE price BETWEEN 50 AND 200
);
#l)
SELECT 
    s.supplier_name,
    AVG(p.price) AS avg_price
FROM suppliers s, products p
WHERE s.supplier_id = p.supplier_id
GROUP BY s.supplier_name
HAVING AVG(p.price) > 100;
#m)
SELECT product_name, price
FROM products
ORDER BY price DESC;
#n)
SELECT 
    (SELECT category_name 
     FROM categories 
     WHERE category_id = p.category_id) AS category_name,
    SUM(p.price * p.stock_quantity) AS total_stock_value
FROM products p
GROUP BY p.category_id
ORDER BY total_stock_value DESC;
