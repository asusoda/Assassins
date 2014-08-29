'use strict';

angular.module('assassinsApp')
.factory('Games', ['$http', 'Restangular', function($http, Restangular) {
  return {
    create: function(data) {
      return $http.post('/api/games', data);
    }
  }
}]);