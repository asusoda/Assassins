'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AnnouncementSchema = new Schema({
  title: String,
  description: String,
  admin: { type: Schema.Types.ObjectId, ref: 'User' },
  game: { type: Schema.Types.ObjectId, ref: 'Game', index: true },
  type: { type: Number, default: 0 },
  created_on: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Announcement', AnnouncementSchema);