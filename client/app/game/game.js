'use strict';

angular.module('assassinsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('game', {
        abstract: true,
        url: '/games',
        template: '<ui-view/>'
      })
      .state('game.explore', {
        url: '/explore',
        templateUrl: 'app/game/views/game.html',
        controller: 'GameExploreCtrl'
      })
      .state('game.create', {
        url: '/new',
        templateUrl: 'app/game/views/game-create.html',
        controller: 'GameCreateCtrl'
      })
      .state('game.page', {
        url: '/:id',
        templateUrl: 'app/game/views/game-page.html',
        controller: 'GamePageCtrl',
        resolve: {
          game: function($stateParams, Games) {
            return Games.getGame($stateParams.id);
          }
        }
      })
      .state('game.page.player', {
        url: '/players/:player_id',
        templateUrl: 'app/game/views/game-page-player.html',
        controller: 'GameProfileCtrl',
        resolve: {
          game: function($stateParams, Games) {
            return Games.getGame($stateParams.id);
          },
          player: function($stateParams, Games) {
            return Games.getPlayer($stateParams.id, $stateParams.player_id);
          }
        }
      })
      .state('game.page.join', {
        url: '/join/:join_url',
        templateUrl: 'app/game/views/game-page-join.html',
        controller: 'GameJoinCtrl',
        resolve: {
          game: function($stateParams, Games) {
            return Games.getGame($stateParams.id);
          }
        }
      })
      .state('game.page.admin', {
        url: '/settings',
        templateUrl: 'app/game/views/game-admin-dashboard.html',
        controller: 'GameEditCtrl',
        resolve: {
          game: function($stateParams, Games) {
            return Games.getGame($stateParams.id).$object;
          }
        }
      })
      .state('game.page.admin.players', {
        url: '/players',
        templateUrl: 'app/game/views/game-admin-players.html',
        resolve: {
          game: function($stateParams, Games) {
            return Games.getGame($stateParams.id).$object;
          }
        }
      })
      .state('game.page.admin.eliminations', {
        url: '/eliminations',
        templateUrl: 'app/game/views/game-admin-eliminations.html',
        resolve: {
          game: function($stateParams, Games) {
            return Games.getGame($stateParams.id).$object;
          }
        }
      })
      .state('game.page.admin.announcements', {
        url: '/announcements',
        templateUrl: 'app/game/views/game-admin-announcements.html',
        resolve: {
          game: function($stateParams, Games) {
            return Games.getGame($stateParams.id).$object;
          }
        }
      });
  });