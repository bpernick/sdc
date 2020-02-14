CREATE TABLE listings (
  id SERIAL PRIMARY KEY,
  listing_id integer NOT NULL,
  user_id integer NOT NULL,
  title VARCHAR(255),
  creation_tsz integer,
  reviews_count integer,
  reviews_for_item integer
);

CREATE TABLE feedback (
  id SERIAL PRIMARY KEY,
  user_id integer NOT NULL,
  message VARCHAR,
  value integer,
  reviewerAvatar VARCHAR,
  reviewerName VARCHAR(255),
  reviewDate VARCHAR(15)
);

CREATE TABLE images (
  id SERIAL PRIMARY KEY,
  listing_id integer NOT NULL,
  image_url text,
  user_id integer NOT NULL
);