const Listing = require("../models/listing.js");

module.exports.index =  async (req, res) => {
    const allListing = await Listing.find({});
    res.render("listing/index.ejs", { allListing });
};

module.exports.newform = (req, res) => {
    res.render("listing/newform.ejs");
};

module.exports.showroute = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id).populate({ path : "reviews", populate: { path: "author"}}).populate("owner");
    if(!listing){
        req.flash("error", "listing does not exist!");
        return res.redirect("/listing");
    }
    console.log(listing);
    res.render("listing/show.ejs", { listing });
};

module.exports.submitform = async (req, res) => {
    let listing = new Listing(req.body.listing);
    listing.owner = req.user._id;
    await listing.save();
    
    req.flash("success", "New Listing Created!");
    res.redirect("/listing");
};

module.exports.editform = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error", "listing does not exist!");
        return res.redirect("/listing");
    }
    res.render("listing/edit.ejs" , { listing });
};

module.exports.editformSubmission = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    req.flash("success", "Listing Edited!");
    res.redirect(`/listing/${id}`);
};

module.exports.deletePerform = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listing");
};