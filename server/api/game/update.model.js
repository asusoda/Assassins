'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UpdateSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  game: { type: Schema.Types.ObjectId, ref: 'Game', index: true },
  title: String,
  description: String,
  link: String,
  audience: { type: String, default: 'All users' }
});

module.exports = mongoose.model('Update', UpdateSchema);