const mongoose = require('mongoose');

//We'll be creating a schema. This represents how a post looks
const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Posts', PostSchema);