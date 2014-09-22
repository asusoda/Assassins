'use strict';

var _ = require('lodash');
var Elimination = require('./elimination.model');

// Get list of eliminations
exports.index = function(req, res) {
  Elimination.find(function (err, eliminations) {
    if(err) { return handleError(res, err); }
    return res.json(200, eliminations);
  });
};

// Get a single elimination
exports.show = function(req, res) {
  Elimination.findById(req.params.id, function (err, elimination) {
    if(err) { return handleError(res, err); }
    if(!elimination) { return res.send(404); }
    return res.json(elimination);
  });
};

// Creates a new elimination in the DB.
exports.create = function(req, res) {
  Elimination.create(req.body, function(err, elimination) {
    if(err) { return handleError(res, err); }
    return res.json(201, elimination);
  });
};

// Updates an existing elimination in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Elimination.findById(req.params.id, function (err, elimination) {
    if (err) { return handleError(res, err); }
    if(!elimination) { return res.send(404); }
    var updated = _.merge(elimination, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, elimination);
    });
  });
};

// Deletes a elimination from the DB.
exports.destroy = function(req, res) {
  Elimination.findById(req.params.id, function (err, elimination) {
    if(err) { return handleError(res, err); }
    if(!elimination) { return res.send(404); }
    elimination.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}