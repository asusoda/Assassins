'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GameSchema = new Schema({
  title: String,
  description: String,
  location: String,
  created_on: { type: Date, default: Date.now },
  active: { type: Boolean, default: true },
  accepting_players: { type: Boolean, default: true },
  join_url: { type: String },
  players: [{
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    alias: { type: String, required: true },
    score: { type: Number, default: 0 },
    alive: { type: Boolean, default: true },
    banned: { type: Boolean, default: false },
    target: { type: Schema.Types.ObjectId, ref: 'Target' },
    join_time: { type: Date, default: Date.now }
  }],
  rules: {
    weapons: [{ type: String }],
    safe_zones: [{ type: String }],
    interval: { type: Number, default: 2 }
  },
  admins: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
});

module.exports = mongoose.model('Game', GameSchema);