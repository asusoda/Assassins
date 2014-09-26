'use strict';

angular.module('assassinsApp')
.factory('Users', ['Restangular', function(Restangular) {
  return {
    getUser: function(id) {
      return Restangular.one('users', id).get();
    }
  };
}]);