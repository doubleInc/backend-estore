const mongoose = require("mongoose")

// regular expression to check url provided is a valid one
const url_re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/

const CategorySchema = new mongoose.Schema({
    //
    name: {
        type: String,
        required: [true, "Please include a name for the category."],
        unique: true,
        maxlength: [50, "Category name is longer than 50 characters."]
    },
    slug: String,
    image: {
        type: String,
        required: false,
        match: [
            url_re,
            "Please use a valid URL for the location of the image."
        ]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Category', CategorySchema)