
module.exports.firstReviews = (data) =>{
console.log(data)
data = data[0];
let answer = [];
for (let i = 0; i < data.reviews.length; i++){
    if (i >= 4){
        break;
    }
    let review = data.reviews[i];
    review.reviews_count = data.reviews_count;
    review.reviews_for_item = data.reviews_for_item;
    review.image_url = data.imgUrls[0];
    review.listing_id = data.listing_id;
    review.title = data.title;
    answer.push(review);
    }
answer.sort((a,b) => a.reviewDate > b. reviewDate ? 1 : -1)
return answer;
}


module.exports.moreReviews = (data) =>{
    data = data[0];
    let answer = [];
    for (let i = 4; i < data.reviews.length; i++){
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

module.exports.images = (data) => {
    console.log(data);
    let answer = [];
    data = data[0];
    for (let i = 0; i < data.imgUrls.length; i++){
        let image = {}
        image.image_url = data.imgUrls[i];
        image.title = data.title;
        image.user_id = data.user_id;
        answer.push(image);
        }
    return answer;
}