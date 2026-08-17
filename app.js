const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));
app.engine("ejs", ejsMate);

main().then(() => {console.log("mongoose are connected")})
.catch(err => {
    console.log(err);
});

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/renthub');
}

app.get("/" , (req, res) => {
    res.send("app are working now");
});
// all list
app.get("/listing", async (req, res) => {
    const allListing = await Listing.find({});
    res.render("listing/index.ejs", { allListing });
});

// new form 
app.get("/listing/newform", (req, res) => {
    res.render("listing/newform.ejs");
})


//  show routes details
app.get("/listing/:id", async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listing/show.ejs", { listing });
});

// submit form
app.post("/listing", async (req, res) => {
    let listing = new Listing(req.body.listing);
    await listing.save();
    res.redirect("/listing");
})

// edit form
app.get("/listing/:id/edit", async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listing/edit.ejs" , { listing });
})
// edit form submit
app.put("/listing/:id", async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listing/${id}`);
})
// delete
app.delete("/listing/:id", async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listing");
})

// app.get("/testListing", async (req, res) => {
//     let sampleListing = new Listing({
//         title: "my new home",
//         description: "By the beach",
//         price: 1200,
//         location: "dhaka",
//         country: "Bd",
//     });
//     await sampleListing.save();
//     console.log(sampleListing);
//     res.send("success");
// })

app.listen("5173", ()=> {
    console.log("app listening now");
})