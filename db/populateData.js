const { etsy_api_key } = require("../config.js");
const { db } = require("./index.js");
const { mockData } = require("./mockData.js");
const axios = require("axios");
const faker = require("faker");

var insertMockListingsData = () => {
  console.log("insert mock was called", mockData.length);
  for (let i = 0; i < mockData.length; i++) {
    let listings = mockData[i];
    let params = [
      listings.listing_id,
      listings.user_id,
      listings.title,
      listings.creation_tsz
    ];
    let queryStr = `INSERT INTO listings (listing_id, user_id, title, creation_tsz) VALUES (?, ?, ?, ?);`;
    db.query(queryStr, params, (err, data) => {
      if (err) {
        console.log("error inserting data", i);
      } else {
        console.log("successfully inserted data!", i);
      }
    });
  }
};
insertMockListingsData();

var insertMockFeedData = () => {
  let j = 0;
  function populate() {
    axios
      .get(
        `https://openapi.etsy.com/v2/users/${mockData[j]["user_id"]}/feedback/as-seller?api_key=${etsy_api_key}`
      )
      .then(response => {
        let updateStr = `UPDATE listings SET reviews_count = ${response.data.count} WHERE user_id = ${mockData[j]["user_id"]}`;
        db.query(updateStr, (err, data) => {
          if (err) {
            console.log(err);
            throw "error updating reviews count";
          }
        });
        let messageHash = {};
        response.data.results.forEach(review => {
          if (messageHash[review.message]) {
            return "Feedback already inserted into DB";
          }
          messageHash[review.message] = true;
          let reviewerAvatar = faker.image.avatar();
          let reviewerName =
            faker.name.firstName() + " " + faker.name.lastName();
          let dateStr = faker.date
            .past()
            .toString()
            .split(" ");
          let reviewDate = `${dateStr[1]} ${dateStr[2]}, ${dateStr[3]}`;
          let params = [
            review.seller_user_id,
            review.message,
            review.value,
            review.creation_tsz,
            reviewerAvatar,
            reviewerName,
            reviewDate
          ];
          let queryStr = `INSERT INTO feedback (user_id, message, value, creation_tsz, reviewerAvatar, reviewerName, reviewDate) VALUES (?,?,?,?,?,?,?);`;
          db.query(queryStr, params, (err, data) => {
            if (err) {
              console.log(err);
              throw "error inserting review into db";
            }
          });
        });
      })
      .then(() => {
        j++;
        console.log("j++ is:", j);
        if (j < 100) {
          setTimeout(populate, 500);
        }
      })
      .catch(err => {
        console.log("user no longer exists");
        j++;
        if (j < 100) {
          setTimeout(populate, 500);
        }
      });
  }
  populate();
};

insertMockFeedData();

const insertImageData = () => {
  let i = 0;
  function addImages() {
    axios
      .get(
        `https://openapi.etsy.com/v2/listings/${mockData[i].listing_id}/images?api_key=${etsy_api_key}`
      )
      .then(response => {
        let images = response.data.results;
        images.forEach(image => {
          let image_url = image.url_fullxfull;
          let listing_id = image.listing_id;
          let user_id = mockData[i].user_id;
          let params = [image_url, listing_id, user_id];
          let queryStr = `INSERT INTO images (image_url, listing_id, user_id) VALUES (?, ?, ?);`;
          if (!listing_id) throw "listing id is null";
          db.query(queryStr, params, (err, data) => {
            if (err) {
              console.log(err);
              throw "error inserting review into db";
            }
          });
        });
      })
      .then(() => {
        console.log("successfully inserted data " + i);
        i++;
        if (i < 100) {
          setTimeout(addImages, 500);
        }
      })
      .catch(err => {
        console.log(err);
        i++;
        if (i < 100) {
          setTimeout(addImages, 500);
        }
      });
  }
  addImages();
};
insertImageData();

function generateRandomReviewsCountForItem() {
  for (let i = 6; i <= 100; i++) {
    const randomBucket = [0.05, 0.1, 0.2, 0.5, 1];
    let qrySelect = `SELECT * FROM listings WHERE id=${i};`;
    db.query(qrySelect, (err, data) => {
      if (err) {
        console.log("listing not found");
      } else {
        let reviewsForListing = Math.ceil(
          randomBucket[Math.floor(Math.random() * 5)] * data[0]["reviews_count"]
        );
        let queryStr = `UPDATE listings SET reviews_for_item = ${reviewsForListing} WHERE id = ${i};`;
        db.query(queryStr, (err, data) => {
          if (err) {
            console.log(error);
          } else {
            console.log("succesfully updated listing item count");
          }
        });
      }
    });
  }
}
generateRandomReviewsCountForItem();
