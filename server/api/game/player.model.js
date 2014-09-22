'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PlayerSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  alias: { type: String, required: true },
  score: { type: Number, default: 0 },
  alive: { type: Boolean, default: true },
  banned: { type: Boolean, default: false },
  target: [{
    target: { type: Schema.Types.ObjectId, ref: 'User' },
    elimination: { type: Schema.Types.ObjectId, ref: 'Elimination' },
    active: { type: Boolean, default: true },
    created_on: { type: Date, default: Date.now }
  }],
  join_time: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Player', PlayerSchema);