'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TargetSchema = new Schema({
  target: { type: Schema.ObjectId, ref: 'User' },
  assassin: { type: Schema.ObjectId, ref: 'User' },
  target_kill: { type: Boolean, default: false },
  created_on: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Target', TargetSchema);