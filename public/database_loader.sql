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

SELECT my_groceries.id, my_groceries.brand, my_groceries.item, my_groceries.my_rating, my_groceries.my_comments, my_groceries.favorite from my_groceries WHERE owner_id = ?;

CREATE TABLE meals(
	id INT AUTO_INCREMENT PRIMARY KEY,
	title VARCHAR (255),
	owner_id INT PRIMARY KEY,
	foreign key (owner_id) REFERENCES users(id) ON DELETE CASCADE
);
	
-- CREATE TABLE my_groceries(
-- 	user_id INT,
-- 	grocery_id INT,
-- 	my_rating INT,
-- 	my_comments VARCHAR(3000),
-- 	favorite BOOLEAN DEFAULT false,
-- 	PRIMARY KEY (user_id, grocery_id),
-- 	foreign key (user_id) REFERENCES users(id) ON DELETE CASCADE,
-- 	foreign key (grocery_id) REFERENCES groceries(id) ON DELETE CASCADE
-- );

CREATE TABLE grocery_tags(
	tag_id INT,
	tag VARCHAR(25),
	grocery_id INT,
	foreign key (grocery_id) REFERENCES groceries(id) ON DELETE CASCADE
);

SELECT my_groceries.id, my_groceries.brand, my_groceries.item, my_groceries.my_rating, my_groceries.my_comments, my_groceries.favorite FROM my_groceries LEFT JOIN users ON users.id = owner_id = 1 WHERE users.username = 'Juicebox343';




SELECT groceries.id, groceries.brand, groceries.item, groceries.community_rating, my_groceries.my_rating FROM groceries, my_groceries WHERE groceries.id = my_groceries.grocery_id;

SELECT groceries.id, groceries.brand, groceries.item, groceries.community_rating, my_groceries.my_rating FROM groceries LEFT JOIN my_groceries ON groceries.id = my_groceries.grocery_id WHERE my_groceries.user_id = 1;


SELECT g.id, g.brand, g.item, g.community_rating, myg.my_rating FROM groceries AS g LEFT JOIN (SELECT * FROM my_groceries WHERE user_id = 1) AS myg ON g.id = myg.grocery_id;

=============
"INSERT INTO my_groceries (user_id, grocery_id, my_rating) 
VALUES ('" + myID + "','" + changeRatingOf + "','" + changeRatingBy + "') 
ON DUPLICATE KEY UPDATE 
my_rating = my_rating +'" + changeRatingBy + "'";
=============

"INSERT INTO my_groceries (user_id, grocery_id, my_rating, my_comments) 
VALUES ('" + myID + "','" + changeRatingOf + "','" + changeRatingBy + "','" + myComments "') 
ON DUPLICATE KEY UPDATE 
my_rating = my_rating +'" + changeRatingBy + "';INSERT groceries SET community_rating = community_rating + " + changeRatingBy + " WHERE id = '" + changeRatingOf + "'";

REPLACE INTO my_groceries (user_id, grocery_id, my_rating) VALUES (myID, changeRatingOf, changeRatingTo) ON DUPLICATE KEY UPDATE my_rating = changeRatingTo;

  
  
UPDATE groceries SET community_rating = community_rating + " + changeRating + " WHERE id = '" + ratingToChange + "';
INSERT grocery_ratings SET my_rating = my_rating + " + changeRating + " WHERE id = '" + ratingToChange + "'";
