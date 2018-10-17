const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    heading: { type: String, required: true },
    text: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
    author: 
        {
           type: mongoose.Schema.Types.ObjectId,
           ref: 'User'
        }
     
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Post', schema);