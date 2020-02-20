DROP DATABASE IF EXISTS etsy_reviews;

CREATE DATABASE etsy_reviews;

USE etsy_reviews;

CREATE TABLE listings (
  listing_id INT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(255),
  creation_tsz INT,
  reviews_count INT,
  reviews_for_item INT
);

CREATE TABLE feedback (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  message text,
  value INT,
  creation_tsz INT,
  reviewerAvatar text,
  reviewerName VARCHAR(255),
  reviewDate VARCHAR(15)
);

CREATE TABLE images (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  listing_id INT NOT NULL,
  image_url text,
  user_id INT NOT NULL,
  FOREIGN KEY (listing_id) REFERENCES items(listing_id)
);

-- etsy api gives us &#39; instead of an apostrope. code below fixes this issue
-- UPDATE feedback 
-- SET message=REPLACE(message, '&#39;',"'");

-- hardode first 6 listings
-- UPDATE listings
-- SET reviews_for_item = 12
-- WHERE id = 1; 

-- UPDATE listings
-- SET reviews_for_item = 23
-- WHERE id = 2; 

-- UPDATE listings
-- SET reviews_for_item = 56
-- WHERE id = 3; 

-- UPDATE listings
-- SET reviews_for_item =  0
-- WHERE id = 4; 

-- UPDATE listings
-- SET reviews_for_item =  2
-- WHERE id = 5; 

-- UPDATE listings
-- SET reviews_for_item = 0
-- WHERE id = 6; 

