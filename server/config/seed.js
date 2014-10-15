/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Game = require('../api/game/game.model');
var Player = require('../api/game/player.model');
var User = require('../api/user/user.model');

Game.find({}).remove(function() {
    Game.create({
      title : 'Cras Parturient Euismod Cras Parturient Euismod',
      location : 'Phoenix, AZ',
      description : 'Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Donec ullamcorper nulla non metus auctor fringilla.'
    }, {
      title : 'Pharetra Quam Justo',
      location : 'Flagstaff, AZ',
      description : 'Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.'
    }, {
      title : 'Cras Amet Dapibus',
      location : 'Tempe, AZ',
      description : 'Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod.'
    }, {
      title : 'Sem Ridiculus Sit',
      location : 'Showlow, AZ',
      description : 'Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Curabitur blandit tempus porttitor. Cras mattis consectetur purus sit amet fermentum.'
    }, {
      title : 'Dolor Euismod Sollicitudin Vehicula',
      location : 'Scottsdale, AZ',
      description : 'Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Nullam id dolor id nibh ultricies vehicula ut id elit. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.'
    }, {
      title : 'Nibh Fermentum Pharetra Tortor',
      location : 'Sedona, AZ',
      description : 'Donec id elit non mi porta gravida at eget metus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porta sem malesuada magna mollis euismod.'
    }, function() {
      console.log('finished populating games');
    });
    Game.create({
      title : 'Bibendum Egestas Consectetur',
      location : 'San Francisco, CA',
      description : 'Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Donec ullamcorper nulla non metus auctor fringilla.'
    }, function(err, game) {
      Player.create({ alias:'El Duderino', score: 2 }, function(err, player) {
          if(err) { return handleError(res, err); }
          Game.findByIdAndUpdate(
            game._id,
            { $push: { players: player._id } },
            function(err, player) {
              if(err) { return handleError(res, err); }
              if(!player) { return res.send(404); }
            });
          Player.create({ alias:'Mr Lebowski', targets: [{ target: player._id }], score: 3 }, function(err, player) {
              if(err) { return handleError(res, err); }
              Game.findByIdAndUpdate(
                game._id,
                { $push: { players: player._id } },
                function(err, player) {
                  if(err) { return handleError(res, err); }
                  if(!player) { return res.send(404); }
                });
            });
        });
      Player.create({alias:'Donny'}, function(err, player) {
          if(err) { return handleError(res, err); }
          Game.findByIdAndUpdate(
            game._id,
            { $push: { players: player._id } },
            function(err, player) {
              if(err) { return handleError(res, err); }
              if(!player) { return res.send(404); }
            });
        });
      Player.create({alias:'Walter'}, function(err, player) {
          if(err) { return handleError(res, err); }
          Game.findByIdAndUpdate(
            game._id,
            { $push: { players: player._id } },
            function(err, player) {
              if(err) { return handleError(res, err); }
              if(!player) { return res.send(404); }
            });
        });
    });
  });

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});