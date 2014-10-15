'use strict';

var _ = require('lodash');
var Game = require('./game.model');
var Update = require('./update.model');

// Get list of updates
exports.index = function(req, res) {
  Game.findById(req.params.id)
    .populate('updates')
    .exec(function(err, game) {
      if(err) { return handleError(res, err); }
      if(!game) { return res.send(404); }
      return res.json(200, game.updates);
    });
};

// Get a single update
exports.show = function(req, res) {
  Game.findById(req.params.id)
    .populate('updates')
    .exec(function(err, game) {
      if(err) { return handleError(res, err); }
      if(!game) { return res.send(404); }
      var update = game.updates.id(req.params.update_id);
      if(!update) { return res.send(404); }
      return res.json(200, update);
    });
};

// Creates a new update in the DB.
exports.create = function(req, res) {
  Update.create(req.body, function(err, update) {
    if(err) { return handleError(res, err); }
    Game.findByIdAndUpdate(
      req.params.id,
      { $push: { updates: update._id } },
      function(err, game) {
        if(err) { return handleError(res, err); }
        return res.json(201, update);
      });
  });
};

// Updates an existing update in the DB.
exports.update = function(req, res) {
  Update.findById(req.params.update_id, function (err, update) {
    if (err) { return handleError(res, err); }
    if(!update) { return res.send(404); }
    var updated = _.merge(update, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, update);
    });
  });
};

// Deletes a update from the DB
exports.destroy = function(req, res) {
  Update.findById(req.params.update_id, function (err, update) {
    if(err) { return handleError(res, err); }
    if(!update) { return res.send(404); }
    update.remove(function(err) {
      if(err) { return handleError(res, err); }
      Game.findByIdAndUpdate(
        req.params.id,
        { $pull: { updates: update._id } },
        function(err, game) {
          if(err) { return handleError(res, err); }
          return res.send(204);
        });
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}