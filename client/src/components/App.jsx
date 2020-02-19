import React from "react";
import ReviewsContainer from "./ReviewsContainer.jsx";
import axios from "axios";
import ReviewsCarousel from "./ReviewsCarousel.jsx";
import Star from "./Star.jsx";

//const baseURL = "http://etsyreviews-env.rkxrh83rhs.us-east-1.elasticbeanstalk.com/";
const baseURL = "";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listingId: 12345,
      messages: [],
      reviewerAvatars: [],
      reviewerNames: [],
      reviewDates: [],
      reviewsCount: null,
      reviewsForItem: null,
      imageUrl: null,
      title: null,
      images: [],
      showMoreButton: true,
      carouselPixels: 0,
      carouselStyle: `translate(0px, 0px)`,
      sellerPics: [],
      sellerTitles: [],
      sellerTabSelected: false
    };
    this.getListingReviews = this.getListingReviews.bind(this);
    this.changeURL = this.changeURL.bind(this);
    this.getMoreReviews = this.getMoreReviews.bind(this);
    this.scrollLeft = this.scrollLeft.bind(this);
    this.scrollRight = this.scrollRight.bind(this);
    this.getListingPictures = this.getListingPictures.bind(this);
    this.getSellerReviews = this.getSellerReviews.bind(this);
  }

  componentDidMount() {
    this.getListingReviews();
    window.addEventListener("itemChanged", event => {
      this.setState({ listingId: Number(event.detail.listingId) }, () =>
        this.getListingReviews()
      );
    });
  }

  getListingReviews(order = "DESC") {
    axios
      .get(`/listings`, {
        params: {
          id: this.state.listingId,
          order
        },
        baseURL
      })
      .then(response => {
        // console.log(response.data);
        const messages = [];
        const reviewerAvatars = [];
        const reviewerNames = [];
        const reviewDates = [];
        const images = [];
        const reviewsCount = response.data[0].reviews_count;
        const reviewsForItem = response.data[0].reviews_for_item;
        const imageUrl = response.data[0].image_url;
        const listingId = response.data[0].listing_id;
        const title =
          response.data[0].title.length > 47
            ? response.data[0].title.slice(0, 50) + "..."
            : response.data[0].title;
        const carouselPixels = 0;
        const carouselStyle = `translate(0px, 0px)`;

        response.data.forEach(review => {
          const randomIndex = Math.floor(Math.random() * 10);
          if (randomIndex > 1) review.image_url = null;
          images.push(review.image_url);
          messages.push(review.message);
          reviewerAvatars.push(review.reviewerAvatar);
          reviewerNames.push(review.reviewerName);
          reviewDates.push(review.reviewDate);
        });

        this.setState({
          messages,
          reviewerAvatars,
          reviewerNames,
          reviewDates,
          reviewsCount,
          reviewsForItem,
          imageUrl,
          listingId,
          title,
          images,
          showMoreButton: true,
          carouselPixels,
          carouselStyle,
          sellerTabSelected: order === "DESC" ? false : true
        });
      })
      .then(() => {
        this.getListingPictures();
      })
      .catch(error => {
        console.log(error);
      });
  }

  getListingPictures() {
    axios
      .get(`/listings/pictures`, {
        params: {
          id: this.state.listingId
        },
        baseURL
      })
      .then(response => {
        const sellerPics = [];
        const sellerTitles = [];
        console.log(response.data)
        response.data.forEach(pic => {
          sellerPics.push(pic.image_url);
          sellerTitles.push(pic.title);
        });
        this.setState({
          sellerPics,
          sellerTitles
        });
      });
  }

  getMoreReviews(order) {
    axios
      .get(`/listings/more`, {
        params: {
          id: this.state.listingId,
          order
        },
        baseURL
      })
      .then(response => {
        const messages = [];
        const reviewerAvatars = [];
        const reviewerNames = [];
        const reviewDates = [];
        const images = [];

        response.data.forEach(review => {
          const randomIndex = Math.floor(Math.random() * 10);
          if (randomIndex > 1) review.image_url = null;
          images.push(review.image_url);
          messages.push(review.message);
          reviewerAvatars.push(review.reviewerAvatar);
          reviewerNames.push(review.reviewerName);
          reviewDates.push(review.reviewDate);
        });

        this.setState({
          messages: [...this.state.messages, ...messages],
          reviewerAvatars: [...this.state.reviewerAvatars, ...reviewerAvatars],
          reviewerNames: [...this.state.reviewerNames, ...reviewerNames],
          reviewDates: [...this.state.reviewDates, ...reviewDates],
          images: [...this.state.images, ...images],
          showMoreButton: false
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  changeURL(e, listing) {
    // create and dispatch the event
    var event = new CustomEvent("itemChanged", {
      detail: {
        listingId: listing
      }
    });
    window.dispatchEvent(event);
  }

  scrollLeft() {
    if (this.state.carouselPixels >= 0) return;
    let newPixel = this.state.carouselPixels + 776;
    let newStyle = `translate(${newPixel}px, 0px)`;
    this.setState({ carouselPixels: newPixel, carouselStyle: newStyle });
  }

  scrollRight() {
    if (
      this.state.carouselPixels <=
      -776 * Math.floor((this.state.sellerPics.length - 1) / 5)
    )
      return;
    let newPixel = this.state.carouselPixels - 776;
    let newStyle = `translate(${newPixel}px, 0px)`;
    this.setState({ carouselPixels: newPixel, carouselStyle: newStyle });
  }

  getSellerReviews(order, sellerTabSelected) {
    this.getListingReviews(order);
    this.setState({ sellerTabSelected });
  }

  render() {
    if (this.state.messages.length === 1 && this.state.messages[0] === null) {
      let arr = [1, 2, 3, 4, 5];
      return (
        <div className="col-xs-8 pr-xs-8 no-reviews">
          <hr />
          <span>
            {arr.map((star, key) => (
              <Star key={key} />
            ))}
          </span>
          <p className="no-reviews">No Reviews Yet</p>
        </div>
      );
    } else {
      return (
        <div className="col-xs-8 pr-xs-8">
          <hr />
          <ReviewsContainer
            messages={this.state.messages}
            reviewerAvatars={this.state.reviewerAvatars}
            reviewerNames={this.state.reviewerNames}
            reviewDates={this.state.reviewDates}
            reviewsCount={this.state.reviewsCount}
            reviewsForItem={this.state.reviewsForItem}
            imageUrl={this.state.imageUrl}
            title={this.state.title}
            images={this.state.images}
            getMoreReviews={this.getMoreReviews}
            showMoreButton={this.state.showMoreButton}
            getSellerReviews={this.getSellerReviews}
            sellerTabSelected={this.state.sellerTabSelected}
          />
          <ReviewsCarousel
            scrollLeft={this.scrollLeft}
            scrollRight={this.scrollRight}
            carouselStyle={this.state.carouselStyle}
            sellerPics={this.state.sellerPics}
            sellerTitles={this.state.sellerTitles}
          />
        </div>
      );
    }
  }
}

export default App;
