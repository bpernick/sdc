CREATE TABLE listings (
  listing_id integer NOT NULL PRIMARY KEY,
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
  user_id integer NOT NULL,
  FOREIGN KEY (listing_id) REFERENCES listings(listing_id)
);

CREATE INDEX image_listing_id_index ON images (listing_id);
CREATE INDEX listing_user_id_index ON listings (user_id);
CREATE INDEX image_user_id_index ON images (user_id);
CREATE INDEX feedback_user_id_index ON feedback (user_id);