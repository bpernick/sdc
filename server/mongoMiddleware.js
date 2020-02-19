
module.exports.firstReviews = (data) =>{
data = data[0];
let answer = [];
for (let i = 0; i < data.reviews.length; i++){
    if (i >= 4){
        break;
    }
    let review = data.reviews[i];
    review.reviews_count = data.revCount;
    review.reviews_for_item = data.revsForItem;
    review.image_url = data.imgUrls[0];
    review.listing_id = data.listing_id;
    review.title = data.title;
    answer.push(review);
    }
answer.sort((a,b) => a.revDate > b. revDate ? 1 : -1)
return answer;
}