const client = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';
let db;
let listings;
// Database Name

// Use connect method to connect to the server

client.connect(url, poolSize = 20, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
  db = client.db('etsy');
  listings = db.collection('listings');
});
function getReviewsForListing(listing_id, order, callback) {
  listings.find({listing_id: listing_id}).toArray((err, results) => {
    if (err){
      callback(err);
    }
    callback(null, results);
  });
}


function getMoreReviews(listing_id, order, callback) {
  client.connect(url, function(err, client) {
    assert.equal(null, err);
    const db = client.db('etsy_reviews');
    const listings = db.collection('listings');
    listings.find({listing_id: listing_id}).toArray((err, results) => {
      if (err){
        throw err;
      }
      callback(null, results);
      client.close();
    })
  })
}

function getListingPictures(listing_id, callback) {
  client.connect(url, function(err, client) {
    assert.equal(null, err);
    const db = client.db('etsy_reviews');
    const listings = db.collection('listings');
    listings.find({listing_id: listing_id}).toArray((err, results) => {
      if (err){
        throw err;
      }
      callback(null, results);
      client.close();
    })
  })
}

// function getReviewsForSeller(listing_id, callback) {  client.connect(url, function(err, client) {
//   assert.equal(null, err);
//   const db = client.db('etsy_reviews');
//   const listings = db.collection('listings');
//   listings.find({listing_id: listing_id}).toArray((err, results) => {
//     if (err){
//       throw err;
//     }
//     callback(null, results);
//     client.close();
//   })
// })
// }

module.exports = {
  client,
  getReviewsForListing,
  getMoreReviews,
  getListingPictures
  // getReviewsForSeller
};
