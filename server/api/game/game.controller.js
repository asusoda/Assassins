'use strict';

var _ = require('lodash');
var Game = require('./game.model');
var Target = require('./target.model');

// Get list of games
exports.index = function(req, res) {
  Game.find(function (err, games) {
    if(err) { return handleError(res, err); }
    return res.json(200, games);
  });
};

// Get a single game
exports.show = function(req, res) {
  Game.findById(req.params.id, '-players -admins', function (err, game) {
    if(err) { return handleError(res, err); }
    if(!game) { return res.send(404); }
    return res.json(game);
  });
};

// Creates a new game in the DB.
exports.create = function(req, res) {
  Game.create(req.body, function(err, game) {
    if(err) { return handleError(res, err); }
    return res.json(201, game);
  });
};

// Check if user is a player in the game
exports.checkPlayer = function(req, res) {
  Game.findById(req.params.id, function(err, game) {
    if(err) { return handleError(res, err); }
    if(!game) { return res.send(404); }
    if(game.players.indexOf(req.params.user_id) > -1) {
      return res.json(200, game);
    } else {
      return res.json(200, {"error": {"message":"User is not a player in this game"}});
    }
  });
};

// Returns players in a game
exports.getPlayers = function(req, res) {
  Game.findById(req.params.id, function(err, game) {
    if(err) { return handleError(res, err); }
    if(!game) { return res.send(404); }
    Game.populate(game, { path: 'players' }, function(err, game) {
      return res.json(200, game.players);
    });
  });
};

// Add user to game
exports.addPlayer = function(req, res) {
  Game.findByIdAndUpdate(
    req.params.id,
    { $push: { 'players': req.params.user_id }},
    function(err, game) {
      if(err) { return handleError(res, err); }
      if(!game) { return res.send(404); }
      return res.json(200, game);
    });
};

// Remove user from game
exports.removePlayer = function(req, res) {
  Game.findByIdAndUpdate(
    req.params.id,
    { $pull: { 'players': req.params.user_id }},
    function(err, game) {
      if(err) { return handleError(res, err); }
      if(!game) { return res.send(404); }
      return res.json(200, game);
    });
};

// Check if user is an organizer in the game
exports.checkAdmin = function(req, res) {
  Game.findById(req.params.id, function(err, game) {
    if(err) { return handleError(res, err); }
    if(!game) { return res.send(404); }
    if(game.admins.length < 1) { return res.send(200, {"error": {"message":"No admins"}}); }
    if(game.admins.indexOf(req.params.user_id) > -1) {
      return res.json(200, game);
    } else {
      return res.json(200, {"error": {"message":"User is not an admin"}});
    }
  });
};

// Returns admins in a game
exports.getAdmins = function(req, res) {
  Game.findById(req.params.id, function(err, game) {
    if(err) { return handleError(res, err); }
    if(!game) { return res.send(404); }
    Game.populate(game, { path: 'admins' }, function(err, game) {
      return res.json(200, game.admins);
    });
  });
};

// Add admin to the game
exports.addAdmin = function(req, res) {
  Game.findById(req.params.id, function(err, game) {
    if(err) { return handleError(res, err); }
    if(!game) { return res.send(404); }
    return res.json(200, game.admins.indexOf(req.body._id));
  });
};

// Remove admin from the game
exports.removeAdmin = function(req, res) {
  Game.findById(req.params.id, function(err, game) {
    if(err) { return handleError(res, err); }
    if(!game) { return res.send(404); }
    return res.json(200, game.admins.indexOf(req.body._id));
  });
};

// Updates an existing game in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Game.findById(req.params.id, function (err, game) {
    if (err) { return handleError(res, err); }
    if(!game) { return res.send(404); }
    var updated = _.merge(game, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, game);
    });
  });
};

// Deletes a game from the DB.
exports.destroy = function(req, res) {
  Game.findById(req.params.id, function (err, game) {
    if(err) { return handleError(res, err); }
    if(!game) { return res.send(404); }
    game.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}