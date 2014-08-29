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
        controller: 'GameCtrl'
      })
      .state('game.create', {
        url: '/new',
        templateUrl: 'app/game/views/game-create.html',
        controller: 'GameCreateCtrl'
      })
      .state('game.page', {
        url: '/:id',
        templateUrl: 'app/game/views/game-page.html',
        controller: 'GamePageCtrl'
      });
  });