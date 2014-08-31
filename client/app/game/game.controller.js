'use strict';

angular.module('assassinsApp')
  .controller('GameExploreCtrl', function ($scope, Games, Auth) {
    $scope.games = Games.getGames().$object;

    $scope.isLoggedIn = Auth.isLoggedIn;
  });

angular.module('assassinsApp')
  .controller('GameCreateCtrl', function ($scope, $state, Games) {
    $scope.formData = {};

    $scope.create = function() {
      Games.create($scope.formData).then(function(res) {
        if(res && !res.error) {
          console.log(res);
          $state.go('game.page', { id: res._id });
        } else {
          console.log('Oops, there was an error: ' + res.error);
        }
      });
    }
  });

angular.module('assassinsApp')
  .controller('GamePageCtrl', function ($scope, Games, game) {
    $scope.game = game;
  });

angular.module('assassinsApp')
  .controller('GameEditCtrl', function ($scope, $stateParams, Games, game) {
    $scope.game = game;

    $scope.formData = {};
    $scope.formData.title = game.title;
    $scope.formData.description = game.description;

    $scope.edit = function() {
      Games.edit($scope.game._id, $scope.formData).then(function(res) {
        if(res && !res.error) {
          console.log(res);
          $scope.game.title = $scope.formData.title;
          $scope.game.description = $scope.formData.description;
        } else {
          console.log('Oops, there was an error: ' + res.error);
        }
      });
    }
  });
