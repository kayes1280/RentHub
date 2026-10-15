const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const isLoggedIn = require("../midleware.js");
const { isOwner , validateListing } = require("../midleware.js");
const listingControler = require("../controler/listing.js");


router
    .route("/")
    // all list
    .get(wrapAsync(listingControler.index))
    // submit form post
    .post(isLoggedIn, validateListing, wrapAsync(listingControler.submitform));


// new form 
router.get("/newform", isLoggedIn,listingControler.newform);

router.route("/:id")
    //show routes details
    .get(wrapAsync(listingControler.showroute))
    // edit form submit
    .put(isLoggedIn, isOwner,validateListing, wrapAsync(listingControler.editformSubmission))
    // delete
    .delete(isLoggedIn,isOwner,wrapAsync(listingControler.deletePerform));


// edit form
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingControler.editform));

module.exports = router;