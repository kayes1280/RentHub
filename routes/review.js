const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");

const { isReviewAuthor , validateReview } = require("../midleware.js");
const reviewControler = require("../controler/review.js");


// comment section 
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewControler.postComment));

// delete review 
router.delete("/:reviewid", isLoggedIn,isReviewAuthor, wrapAsync(reviewControler.deleteComment));

module.exports = router;