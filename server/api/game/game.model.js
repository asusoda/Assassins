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
  updates: [{ type: Schema.Types.ObjectId, ref: 'Update' }],
  players: [{ type: Schema.Types.ObjectId, ref: 'Player' }],
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