 DROP DATABASE IF EXISTS bamazon_db;
  CREATE DATABASE bamazon_db;

  USE bamazon_db;

  CREATE TABLE products (
   item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(30) NOT NULL,
    department_name VARCHAR(20) NOT NULL,
    price INTEGER(10) NOT NULL,
    stock_quantity INTEGER(5) NULL,
    PRIMARY KEY (item_id)
  );
  INSERT INTO products (product_name, department_name, price, stock_quantity)
  VALUES ("tooth brush", "bathroom", 1.19, 8);

  INSERT INTO products (product_name, department_name, price, stock_quantity)
  VALUES ("shower curtain", "bathroom", 3.87, 9);

  INSERT INTO products (product_name, department_name, price, stock_quantity)
  VALUES ("skillet", "kitchen", 8.72, 4);

  INSERT INTO products (product_name, department_name, price, stock_quantity)
  VALUES ("teapot", "kitchen", 13.97, 2);

  INSERT INTO products (product_name, department_name, price, stock_quantity)
  VALUES ("tablet", "electronics", 87.99, 13);

  INSERT INTO products (product_name, department_name, price, stock_quantity)
  VALUES ("xbox", "electronics", 287.99, 6);

  INSERT INTO products (product_name, department_name, price, stock_quantity)
  VALUES ("ps4", "electronics", 299.99, 100);

  INSERT INTO products (product_name, department_name, price, stock_quantity)
  VALUES ("screw driver", "tools", 2.60, 4);

  INSERT INTO products (product_name, department_name, price, stock_quantity)
  VALUES ("rachet", "tools", 3.08, 6);

  INSERT INTO products (product_name, department_name, price, stock_quantity)
  VALUES ("tape measure", "tools", 6.82, 1);

  INSERT INTO products (product_name, department_name, price, stock_quantity)
  VALUES ("toaster", "applicances", 6.82, 41);

  INSERT INTO products (product_name, department_name, price, stock_quantity)
  VALUES ("microwave", "appliances", 6.82, 31);

  INSERT INTO products (product_name, department_name, price, stock_quantity)
  VALUES ("dish washer", "appliances", 594.09, 24);

  SELECT * FROM products