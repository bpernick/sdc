const client = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';
 
// Database Name

// Use connect method to connect to the server
client.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
   

});

function getReviewsForListing(listing_id, order, callback) {
  client.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    const db = client.db('etsy_reviews');
    const listings = db.collection('listings');
    listings.find({listing_id: 25}).toArray((err, results) => {
      if (err){
        throw err;
      }
      callback(null, results);
      client.close();
  })
})
  //     for (let i = 0; i < data.reviews.length; i++){
  //       if (i >= 4){
  //         break;
  //       }
  //       let review = data.reviews[i];
  //       review.reviews_count = data.revCount;
  //       review.reviews_for_item = data.revsForItem;
  //       review.image_url = data.imgUrls[0];
  //       review.listing_id = data.listing_id;
  //       review.title = data.title;
  //       answer.push(review);
  //       client.close();
  //     }
  //   })
  //   answer.sort((a,b) => a.revDate > b. revDate ? 1 : -1)
  //   callback(null, answer)
  // })
};

function getMoreReviews(listing_id, order, callback) {
  let qryStr = `SELECT 
  b.*, 
  a.reviews_count,
  a.reviews_for_item,
  c.image_url,
  a.listing_id,
  a.title
FROM listings a 
LEFT JOIN feedback b 
  ON a.user_id = b.user_id
LEFT JOIN (SELECT * FROM images WHERE listing_id = '${listing_id}' LIMIT 1) as c
  ON a.listing_id = c.listing_id
WHERE a.listing_id = '${listing_id}'
ORDER BY b.reviewDate ${order}
LIMIT 4, 16;`;

  db.query(qryStr, (err, data) => {
    err ? callback(err, null) : callback(null, data);
  });
}

function getListingPictures(listing_id, callback) {``
  let qryStr = `SELECT 
	a.title,
    b.image_url,
    a.user_id
FROM listings a INNER JOIN images b
	ON a.user_id = b.user_id
WHERE a.user_id = (SELECT DISTINCT user_id FROM listings WHERE listing_id = '${listing_id}')
  AND a.listing_id = '${listing_id}'
;`;
  db.query(qryStr, (err, data) => {
    err ? callback(err, null) : callback(null, data);
  });
}

function getReviewsForSeller(listing_id, callback) {
  let qryStr = `SELECT 
  b.*, 
  a.reviews_count,
  a.reviews_for_item,
  c.image_url,
  a.listing_id,
  a.title
FROM listings a 
LEFT JOIN feedback b 
  ON a.user_id = b.user_id
LEFT JOIN (SELECT * FROM images WHERE listing_id = '${listing_id}' LIMIT 1) as c
  ON a.listing_id = c.listing_id
WHERE a.listing_id = '${listing_id}'
ORDER BY b.reviewDate ASC
LIMIT 4
;`;

  db.query(qryStr, (err, data) => {
    err ? callback(err, null) : callback(null, data);
  });
}

module.exports = {
  client,
  getReviewsForListing,
  getMoreReviews,
  getListingPictures,
  getReviewsForSeller
};
