const { client } = require("./psqlIndex.js");
const format = require('pg-format');
const { mockData } = require("./mockData.js");
const faker = require("faker");

let a = 0;
let insertThousand = () => {
    var insertMockListingsData = () => {
        console.log("insert mock was called", mockData.length);
        valuesArr = []
        for (let j = 0; j < 100; j++){
          for (let i = 0; i < mockData.length; i++) {
            let listings = mockData[i];
            let params = [
              listings.listing_id,
              listings.user_id,
              listings.title,
              listings.creation_tsz
            ];
            valuesArr.push(params);
          }
        }
        let queryStr = `INSERT INTO listings (listing_id, user_id, title, creation_tsz) VALUES %L ;`;
        let theQuery = format(queryStr, valuesArr);
        client.query(theQuery, (err, data) => {
          if (err) {
            console.log("error inserting data");
            throw err;
          } else {
            console.log("successfully inserted data!");
          }
        });
      };
      insertMockListingsData();


    const insertImageData = () => {
      let nestedParams = [];
      for (var k = 0; k < 100; k++){
          for (var i = 0; i < 100; i++){
              imgNum = faker.random.number(4);
              for (var j = 0; j <= imgNum; j++){
                let image_url = faker.image.imageUrl();
                let listing_id = mockData[i].listing_id;
                let user_id = mockData[i].user_id;
                let params = [image_url, listing_id, user_id];
                nestedParams.push(params);
              }
          }
      }
      let queryStr = `INSERT INTO images (image_url, listing_id, user_id) VALUES %L ;`;
      let theQuery = format(queryStr, nestedParams);
      client.query(theQuery, (err, data) => {
          if (err) {
            throw "error inserting review into db";
          }
      });
    }
    insertImageData();
    a++;
    if (a < 1000){
      setTimeout(insertThousand, 1000);
    }
}
insertThousand();

  var insertMockFeedData = () => {
    for (let j = 0; j < 100; j++){
        let userReviewCount = faker.random.number(19);
        let updateStr = `UPDATE listings SET reviews_count = ${userReviewCount + 1} WHERE user_id = ${mockData[j]["user_id"]}`;
            client.query(updateStr, (err, data) => {
            if (err) {
                console.log(err);
                throw "error updating reviews count";
            }
            });
            let nestedParams = [];
            for (let i = 0; i <= userReviewCount; i++){
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
                nestedParams.push(params);
            }
            let queryStr = `INSERT INTO feedback (user_id, message, value, reviewerAvatar, reviewerName, reviewDate) VALUES %L ;`;
            let theQuery = format(queryStr, nestedParams);
            client.query(theQuery, (err, data) => {
              if (err) {
              console.log(err);
              throw "error inserting review into db";
              }
          });
        }
        console.log("ALL DONE!")
  }
  insertMockFeedData()