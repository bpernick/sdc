const { client } = require("./psqlIndex.js");
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
      let queryStr = `INSERT INTO listings (listing_id, user_id, title, creation_tsz) VALUES ($1, $2, $3, $4);`;
      client.query(queryStr, params, (err, data) => {
        if (err) {
          console.log("error inserting data", i);
        } else {
          console.log("successfully inserted data!", i);
        }
      });
    }
  };
  insertMockListingsData();



  //update review count in listings
  //update feedback
  var insertMockFeedData = () => {
    for (let j = 0; j < 100; j++){
        let userReviewCount = faker.random.number(1,20);
        let updateStr = `UPDATE listings SET reviews_count = ${userReviewCount} WHERE user_id = ${mockData[j]["user_id"]}`;
            client.query(updateStr, (err, data) => {
            if (err) {
                console.log(err);
                throw "error updating reviews count";
            }
            });
            for (let i = 0; i <= j; i++){
                if (!mockData[j]){
                    console.log("FAIL AT", j)
                }
                let user_id = mockData[j]["user_id"];
                let message = faker.lorem.paragraph();
                let value = faker.random.number(1,5);
                let reviewerAvatar = faker.image.avatar();
                let reviewerName =
                    faker.name.firstName() + " " + faker.name.lastName();
                let dateStr = faker.date
                    .past()
                    .toString()
                    .split(" ");
                let reviewDate = `${dateStr[1]} ${dateStr[2]}, ${dateStr[3]}`;
                let params = [
                    user_id,
                    message,
                    value,
                    reviewerAvatar,
                    reviewerName,
                    reviewDate
                ];
                let queryStr = `INSERT INTO feedback (user_id, message, value, reviewerAvatar, reviewerName, reviewDate) VALUES ($1, $2, $3, $4, $5, $6);`;
                client.query(queryStr, params, (err, data) => {
                    if (err) {
                    console.log(err);
                    throw "error inserting review into db";
                    }
                });
            }
        }
  }
  insertMockFeedData()

const insertImageData = () => {
    for (var i = 0; i < 100; i++){
        imgNum = faker.random.number(4);
        console.log(imgNum)
        for(var j = 0; j <= imgNum; j++){
          let image_url = faker.image.imageUrl();
          let listing_id = mockData[i].listing_id;
          let user_id = mockData[i].user_id;
          let params = [image_url, listing_id, user_id];
          let queryStr = `INSERT INTO images (image_url, listing_id, user_id) VALUES ($1, $2, $3);`;
          if (!listing_id) throw "listing id is null";
          client.query(queryStr, params, (err, data) => {
            if (err) {
              throw "error inserting review into db";
            }
          });
        }
    }
}
insertImageData();


  //make random # of imgs 1-5
  //for each image
  //fake data about the image
  //push it