const { mockData } = require("./mockData.js");
const faker = require("faker");
const client = require('mongodb').MongoClient;
const assert = require('assert');
const dbName = 'etsy_reviews';
const tableName = 'listings';
// Connection URL
const url = 'mongodb://localhost:27017';
 
// Database Name

// Use connect method to connect to the server
client.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const listings = db.collection('listings');
  let a = 0;
  let insertTenThousand = () => {
    let seedArray = [];
    let userStorage = {};

    for(let z = 0; z < 100; z++){
        for (i = 0; i< mockData.length; i++){
            let dateStr = faker.date
            .past()
            .toString()
            .split(" ");
            
            let reviews = [];
            let revCount;
            let userId = mockData[i].user_id;
            revCount = faker.random.number(19);
            if (!userStorage[userId]){
                for (let j = 0; j <= revCount; j++){
                    reviews.push({
                    revMsg : faker.lorem.paragraph(),
                    revVal : faker.random.number(5),
                    revAvatar: faker.image.avatar(),
                    revName : faker.name.firstName() + " " + faker.name.lastName(),
                    revDate : `${dateStr[1]} ${dateStr[2]}, ${dateStr[3]}`
                    })
                }
                userStorage[userId] = reviews;
            }else{
                reviews = userStorage[userId];
                revCount = reviews.length;
            }
            let imgs = [];
            let imgCount = faker.random.number(4);
            for (let k = 0; k <= imgCount; k++){
                imgs.push(faker.image.imageUrl())
            }
            let seed = {
                userId: mockData[i].user_id,
                reviews: reviews,
                imgUrls: imgs,
                title: faker.commerce.productName(),
                revCount: revCount + 1,
                imgCount: imgCount + 1,
                revsForItem: faker.random.number(5)
            }
            seedArray.push(seed);
        }
    }
    listings.insertMany(seedArray);
    if (a < 1000){
        console.log("A IS", a);
        a++;
        setTimeout(insertTenThousand, 600)
    }
  }
  console.log("ALL DONE!")
});
