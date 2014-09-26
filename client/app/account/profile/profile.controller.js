'use strict';

angular.module('assassinsApp')
  .controller('UserProfileCtrl', function ($scope, Games, Auth, user) {
    var current_user = Auth.getCurrentUser();

    $scope.user = user;

  });