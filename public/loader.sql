CREATE DATABASE myflavor;

CREATE TABLE users(
	id INT AUTO_INCREMENT PRIMARY KEY,
	username VARCHAR(255) UNIQUE,
	first_name VARCHAR(50),
	user_email varchar(255),
	password VARCHAR(255)
);

CREATE TABLE my_groceries(
	id INT AUTO_INCREMENT PRIMARY KEY,
	brand VARCHAR (255),
	item VARCHAR (255),
	my_rating INT,
	my_comments VARCHAR(3000),
	favorite BOOLEAN DEFAULT false,
	owner_id INT,
	foreign key (owner_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE meals(
	id INT AUTO_INCREMENT PRIMARY KEY,
	title VARCHAR (255),
	owner_id INT PRIMARY KEY,
	foreign key (owner_id) REFERENCES users(id) ON DELETE CASCADE
);
