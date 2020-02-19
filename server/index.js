const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3006;
const db = require("../db/mongoIndex.js");
// const db = require("../db/index");
const path = require("path");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "..", "client", "dist")));

app.get("/listings", (req, res) => {
  // console.log("listings", req.query.order);
  db.getReviewsForListing(req.query.id, req.query.order, (err, data) => {
    if (err) {
      return res.status(404).send("listing not found");
    }
    res.status(200).send(data);
  });
});

app.get("/listings/pictures", (req, res) => {
  // console.log("pictures", req.query.id);
  db.getListingPictures(req.query.id, (err, data) => {
    if (err) {
      return res.status(404).send("error retrieving more data for listing");
    }
    res.status(200).send(data);
  })
});

app.get("/listings/more", (req, res) => {
  // console.log("listings more", req.query.order);
  db.getMoreReviews(req.query.id, req.query.order, (err, data) => {
    if (err) {
      return res.status(404).send("error retrieving more data for listing");
    }
    res.status(200).send(data);
  });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
