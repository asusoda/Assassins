'use strict';

angular.module('assassinsApp')
.factory('Games', ['Restangular', function(Restangular) {
  return {
    create: function(data) {
      return Restangular.all('games').post(data);
    },
    getGames: function() {
      return Restangular.all('games').getList();
    },
    getGame: function(id) {
      return Restangular.one('games', id).get();
    },
    edit: function(id, data) {
      return Restangular.one('games', id).put(data);
    },
    checkPlayer: function(game, id) {
      return Restangular.one('games', game).one('players', id).get();
    },
    addPlayer: function(game, id) {
      return Restangular.one('games', game).one('players', id).put();
    },
    removePlayer: function(game, id) {
      return Restangular.one('games', game).one('players', id).remove();
    },
    getPlayers: function(game) {
      return Restangular.one('games', game).getList('players');
    },
    checkAdmin: function(game, id) {
      return Restangular.one('games', game).one('admins', id).get();
    },
    addAdmin: function(game, id) {
      return Restangular.one('games', game).one('admins', id).put();
    },
    removeAdmin: function(game, id) {
      return Restangular.one('games', game).one('admins', id).remove();
    },
    getAdmins: function(game) {
      return Restangular.one('games', game).getList('admins');
    }
  }
}]);