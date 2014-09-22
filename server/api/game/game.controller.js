'use strict';

var _ = require('lodash');
var Game = require('./game.model');
var Player = require('./player.model');
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

// Assigns a target to a player
exports.assignTarget = function(req, res) {
  Player.findByIdAndUpdate(
    req.params.player_id,
    { $push: { target: { target: req.params.target_id, } } },
    function(err, player) {
      if(err) { return handleError(res, err); }
      if(!player) { return res.send(404); }
      return res.json(200, player);
    });
};

// Gets a single target
exports.getTarget = function(req, res) {
  Player.findById(req.params.player_id, function (err, player) {
    if(err) { return handleError(res, err); }
    var target = player.target.id(req.params.target_id);
    if(!target) { return res.send(404); }
    return res.json(200, target);
  });
};

// Gets a list of targets
exports.getTargets = function(req, res) {

};

// Updates a single target
exports.updateTarget = function(req, res) {
  Player.findById(req.params.player_id, function (err, player) {
    if (err) { return handleError(res, err); }
    if(!player) { return res.send(404); }
    var updated = _.merge(player.target, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, player);
    });
  });
};

// Removes a target from a player
exports.removeTarget = function(req, res) {

};

// Check if user is a player in the game
exports.checkUser = function(req, res) {
  Game.findById(req.params.id)
    .populate('players')
    .exec(function(err, game) {
      if(err) { return handleError(res, err); }
      if(!game) { return res.send(404); }
      _.filter(game.players, function(player) {
        if(player.user == req.params.user_id) {
          return res.json(200, player);
        } else {
          return res.json(200, {"error": {"message":"User is not a player in this game"}});
        }
      });
    });
};

// Creates a player document and adds it to the game
exports.addPlayer = function(req, res) {
  Player.create(req.body, function(err, player) {
    if(err) { return handleError(res, err); }
    Game.findByIdAndUpdate(
      req.params.id,
      { $push: { players: player._id } },
      function(err, player) {
        if(err) { return handleError(res, err); }
        if(!player) { return res.send(404); }
        return res.json(200, player);
      });
  });
};

// Deletes a player document and removes it from the game
exports.removePlayer = function(req, res) {
  Player.findById(req.params.player_id, function (err, player) {
    if(err) { return handleError(res, err); }
    if(!player) { return res.send(404); }
    player.remove(function(err) {
      if(err) { return handleError(res, err); }
      Game.findByIdAndUpdate(
        req.params.game_id,
        { $pull: { players: req.params.player_id } },
        function(err, game) {
          if(err) { return handleError(res, err); }
          if(!game) { return res.send(404); }
          return res.json(204, game);
        });
    });
  });
};

// Returns players in a game
exports.getPlayers = function(req, res) {
  Game.findById(req.params.id)
    .populate('players')
    .exec(function(err, game) {
      if(err) { return handleError(res, err); }
      if(!game) { return res.send(404); }
      return res.json(200, game.players);
    });
};

// Returns a single player in a game
exports.getPlayer = function(req, res) {
  Player.findById(req.params.player_id, function (err, player) {
    if(err) { return handleError(res, err); }
    if(!player) { return res.send(404); }
    return res.json(player);
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