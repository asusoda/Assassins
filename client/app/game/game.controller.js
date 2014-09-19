'use strict';

angular.module('assassinsApp')
  .controller('GameExploreCtrl', function ($scope, Games, Auth) {
    $scope.games = Games.getGames().$object;

    $scope.isLoggedIn = Auth.isLoggedIn;
  });

angular.module('assassinsApp')
  .controller('GameCreateCtrl', function ($scope, $state, toaster, Games, Auth) {
    var user = Auth.getCurrentUser();
    $scope.formData = {};
    $scope.formData.admins = user._id;

    $scope.create = function() {
      Games.create($scope.formData).then(function(res) {
        if(res && !res.error) {
          $state.go('game.page', { id: res._id });
        } else {
          toaster.pop('error', 'Oops! There was an issue', res.error.message);
        }
      });
    };
  });

angular.module('assassinsApp')
  .controller('GamePageCtrl', function ($scope, Games, Auth, game) {
    var user = Auth.getCurrentUser();

    $scope.game = game;
    $scope.user = user;
    $scope.game.players = Games.getPlayers(game._id).$object;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isOrganizer = false;

    Games.checkAdmin(game._id, user._id).then(function(res) {
      if(res && !res.error) {
        $scope.isOrganizer = true;
      } else {
        $scope.isOrganizer = false;
      }
    });

  });

angular.module('assassinsApp')
  .controller('GameProfileCtrl', function ($scope, Games, Auth, game) {
    var user = Auth.getCurrentUser();

    $scope.game = game;
    $scope.user = user;
    $scope.game.players = Games.getPlayers(game._id).$object;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.player = {};
    $scope.isOrganizer = false;

    Games.checkAdmin(game._id, user._id).then(function(res) {
      if(res && !res.error) {
        $scope.isOrganizer = true;
      } else {
        $scope.isOrganizer = false;
      }
    });

  });

angular.module('assassinsApp')
  .controller('GameJoinCtrl', function ($scope, $state, $stateParams, toaster, Games, Auth, game) {
    var user = Auth.getCurrentUser();

    $scope.formData = {};
    $scope.formData.user = user._id;

    $scope.join = function() {
      if($stateParams.join_url == game.join_url) {
        console.log('correct join url');
        Games.addPlayer(game._id, $scope.formData).then(function(res) {
          if(res && !res.error) {
            console.log(res);
            toaster.pop('success', 'Great success! Joined game', 'You just joined ' + $scope.game.title);
            $state.go('game.page', { id: game._id }, { reload: true });
          } else {
            toaster.pop('error', 'Oops! There was an issue', res.error.message);
          }
        });
      } else {
        console.log('incorrect join url');
      }
    };

  });

angular.module('assassinsApp')
  .controller('GameEditCtrl', function ($scope, $stateParams, toaster, Games, game) {

    $scope.game = game;
    $scope.game.players = Games.getPlayers(game._id).$object;
    $scope.formData = {};
    $scope.formData.title = game.title;
    $scope.formData.location = game.location;
    $scope.formData.description = game.description;

    $scope.edit = function() {
      Games.edit($scope.game._id, $scope.formData).then(function(res) {
        if(res && !res.error) {
          $scope.game.title = $scope.formData.title;
          $scope.game.location = $scope.formData.location;
          $scope.game.description = $scope.formData.description;
        } else {
          toaster.pop('error', 'Oops! There was an issue', res.error.message);
        }
      });
    };

    $scope.resetJoinKey = function() {
      Games.resetJoinKey(game._id, game.join_url).then(function(res) {
        if(res && !res.error) {
          toaster.pop('success', 'Join URL reset', 'You reset the join URL for the game');
          $scope.game.join_url = res.key;
        } else {
          toaster.pop('error', 'Oops! There was an issue', res.error.message);
        }
      });
    }
  });
