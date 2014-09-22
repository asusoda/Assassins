'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EliminationSchema = new Schema({
  game: { type: Schema.Types.ObjectId, ref: 'Game' },
  target: { type: Schema.Types.ObjectId, ref: 'User' },
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  target_verified: { type: Boolean, default: false },
  verified: { type: Boolean, default: false },
  text: String,
  updated: { type: Date, default: Date.now },
  created_on: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Elimination', EliminationSchema);