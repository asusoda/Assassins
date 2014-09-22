/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Elimination = require('./elimination.model');

exports.register = function(socket) {
  Elimination.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Elimination.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('elimination:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('elimination:remove', doc);
}