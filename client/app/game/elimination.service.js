'use strict';

angular.module('assassinsApp')
.factory('Eliminations', ['Restangular', function(Restangular) {
  return {
    create: function(game, data) {
      return Restangular.one('games', game).all('eliminations').post(date);
    },
    targetVerify: function(game, id, data) {
      return Restangular.one('games', game).one('eliminations', id).put(date);
    },
    verify: function(game, id, data) {
      return Restangular.one('games', game).one('eliminations', id).put(date);
    }
  };
}]);