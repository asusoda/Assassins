'use strict';

var _ = require('lodash');
var Game = require('./game.model');
var crypto = require('crypto');

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
  req.body.join_url = randomValueBase64(7);
  Game.create(req.body, function(err, game) {
    if(err) { return handleError(res, err); }
    return res.json(201, game);
  });
};

// Check if user is a player in the game
exports.checkPlayer = function(req, res) {
  Game.findById(req.params.id)
    .exec(function(err, game) {
      if(err) { return handleError(res, err); }
      if(!game) { return res.send(404); }
      _.filter(game.players, function(i) {
        if(i.user == req.params.user_id) {
          return res.json(200, {"success": {"message":"User is in game"}});
        } else {
          return res.json(200, {"error": {"message":"User is not a player in this game"}});
        }
      });
    });
};

// Returns players in a game
exports.getPlayers = function(req, res) {
  Game.findById(req.params.id)
    .populate('players.user')
    .exec(function(err, game) {
      if(err) { return handleError(res, err); }
      if(!game) { return res.send(404); }
      return res.json(200, game.players);
    });
};

// Add user to game
exports.addPlayer = function(req, res) {
  Game.findByIdAndUpdate(
    req.params.id,
    { $push: { players: { user: req.body.user, alias: req.body.alias } } },
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
    { $pull: { players: { $pull: { user: req.params.user_id } } } },
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
    Game.populate(game, { path: 'admins', select: '-hashedPassword -salt' }, function(err, game) {
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

// Reset join URL for the game
exports.resetJoinKey = function(req, res) {
  var key = randomValueBase64(7);
  Game.findByIdAndUpdate(req.params.id, { $set: { join_url: key } }, function(err, game) {
    if(err) { return handleError(res, err); }
    if(!game) { return res.send(404); }
    return res.json(200, { key: game.join_url });
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

function randomValueBase64 (len) {
  return crypto.randomBytes(Math.ceil(len * 3 / 4))
    .toString('base64')   // convert to base64 format
    .slice(0, len)        // return required number of characters
    .replace(/\+/g, '0')  // replace '+' with '0'
    .replace(/\//g, '0'); // replace '/' with '0'
}

function handleError(res, err) {
  return res.send(500, err);
}