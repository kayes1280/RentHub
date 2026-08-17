const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let listingSchema = Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        default: "https://www.pexels.com/video/sunset-silhouette-on-a-pier-with-ocean-view-38670284/",
        type: String,
        set: (v) => v === "" ?"https://www.pexels.com/video/sunset-silhouette-on-a-pier-with-ocean-view-38670284/" : v,
    },
    price: Number,
    location: String,
    country: String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;