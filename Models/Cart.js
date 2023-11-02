const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user:{type:String},
    slug:{type:String},
    quantity:{type:Number},
    identifier:{type:String}
});


module.exports = mongoose.model('Cart', cartSchema);