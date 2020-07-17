DROP DATABASE IF EXISTS greatBay_db;
CREATE DATABASE greatBay_db;
USE greatBay_db;

CREATE TABLE item(
  id INTEGER(11) AUTO_INCREMENT NOT NULL primary key,
  name VARCHAR(15),
  description VARCHAR(100) ,
  bid VARCHAR(100) NULL
);