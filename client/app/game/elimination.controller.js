'use strict';

angular.module('assassinsApp')
  .controller('GameEliminateCreate', function ($scope, Games, Auth, game, player) {
    var user = Auth.getCurrentUser();

    $scope.game = game;
    $scope.player = player;
    $scope.user = user;

  });

angular.module('assassinsApp')
  .controller('GameEliminateVerify', function ($scope, Games, Auth, game, player) {
    var user = Auth.getCurrentUser();

    $scope.game = game;
    $scope.player = player;
    $scope.user = user;

  });