'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GameSchema = new Schema({
  title: String,
  description: String,
  active: Boolean,
  players: [],
  admins: []
});

module.exports = mongoose.model('Game', GameSchema);