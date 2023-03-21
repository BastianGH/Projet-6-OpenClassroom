const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator') If you want a value not to get duplicated in column UNIQUE

const modelOne = mongoose.Schema({
key: { type: dataType, required: Boolean /*unique: true */} // UNIQUE
});

// modelOne.Schema(uniqueValidator) UNIQUE
module.exports = mongoose.model('modelOne', modelOne);