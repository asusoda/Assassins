'use strict';

angular.module('assassinsApp')
.factory('Games', ['$http', 'Restangular', function($http, Restangular) {
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
    }
  }
}]);