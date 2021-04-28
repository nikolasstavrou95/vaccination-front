const mongoose = require("mongoose");

const Hospital = mongoose.model(
    "Hospital",
    new mongoose.Schema({
        name: String,
        address: String,

        phone: String,
        doses: String,


        email: String,
        password: String,


    })
);

module.exports = Hospital;