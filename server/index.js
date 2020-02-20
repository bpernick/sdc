const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;
const db = require("../db/psqlIndex.js");
// const db = require("../db/mongoIndex.js");
const mongoMiddleware = require('./mongoMiddleware')
// const db = require("../db/index");
const path = require("path");
const cors = require("cors");
 
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "..", "client", "dist")));

app.get("/listings", (req, res) => {
  
  let id = req.query.id;
  // let id = parseInt(req.query.id);
  db.getReviewsForListing(id, req.query.order, (err, data) => {
    if (err) {
      console.log(err)
      return res.status(404).send("listing not found");
    }
    // data = mongoMiddleware.firstReviews(data);
    data = data.rows;
    res.status(200).send(data);
  });
});
app.get("/listings/pictures", (req, res) => {

  let id = req.query.id;
  // let id = parseInt(req.query.id);
  db.getListingPictures(id, (err, data) => {
    if (err) {
      return res.status(404).send("error retrieving more data for listing");
    }
    // data = mongoMiddleware.images(data);
    data = data.rows;
    res.status(200).send(data);
  })
});

app.get("/listings/more", (req, res) => {
  let id = req.query.id;
  // let id = parseInt(req.query.id);
  db.getMoreReviews(id, req.query.order, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(404).send("error retrieving more data for listing");
    }
    //data = mongoMiddleware.moreReviews(data);
    data = data.rows;
    res.status(200).send(data);
  });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
