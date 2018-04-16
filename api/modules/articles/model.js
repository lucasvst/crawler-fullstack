const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    date: { type: Date, required: true },
    origin: { type: String, required: true },
    category: { type: String/* , required: true */ },
    title: { type: String/* , required: true */ },
    excerpt: { type: String/* , required: true */ },
    url: { type: String/* , required: true */ },

    checksum: { type: String, required: true },

});

module.exports = mongoose.model('Article', schema);