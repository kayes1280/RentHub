const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const initData = require("./data.js");


main().then(() => {console.log("mongoose are connected")})
.catch(err => {
    console.log(err);
});

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/renthub');
}

const initDB = async () => {
    // await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({ ...obj , owner: '6ab3b628c3dc1174cb8954eb'}));
    await Listing.insertMany(initData.data);
    console.log("initialize data");
}

initDB();
