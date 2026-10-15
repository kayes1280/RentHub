const mongoose = require("mongoose");
let Schema = mongoose.Schema;
const Review = require("./review.js");

let listingSchema = Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        default: 'https://picsum.photos/seed/house28/600/400',
        type: String,
        set: (v) => v === "" ?'https://picsum.photos/seed/house28/600/400' : v,
    },
    price: Number,
    location: String,
    country: String,

    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    
    ],
    
    owner:{
            type: Schema.Types.ObjectId,
            ref: "User",
        },

});

listingSchema.post("findOneAndDelete", async (listing) => {
    if(listing){
        await Review.deleteMany({_id: { $in: listing.reviews }});
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;