// This is not a MODEL by it's self!
// This is a Schema and it is a part of a user model

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: String
});

module.exports = PostSchema;
