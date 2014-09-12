'use strict';

angular.module('assassinsApp')
.directive('buttonGameJoin', ['Games', 'Auth', 'toaster', function(Games, Auth, toaster) {
  return {
    restrict: 'A',
    scope: {
      user: '=',
      game: '='
    },
    template: '<button class="btn {{btn.class}}" role="button"><span class="glyphicon {{btn.icon}}"></span>{{btn.text}}</button>',
    link: function(scope, element, attr) {
      var game = scope.game,
          user = scope.user;
      scope.btn = {};
      scope.btn.class = 'btn-success';
      scope.btn.icon = 'glyphicon-plus'
      scope.btn.text = 'Join game';
      scope.inGame = false;

      Games.checkPlayer(game._id, user._id).then(function(res) {
        if(res && !res.error) {
          scope.btn.text = 'In game';
          scope.btn.icon = 'glyphicon-ok';
          scope.inGame = true;
        }
      });

      return element.bind({
        mouseenter: function() {
          if(scope.inGame) {
            scope.$apply(function() {
              scope.btn.class = 'btn-danger';
              scope.btn.icon = 'glyphicon-remove';
              scope.btn.text = 'Leave game';
            });
          }
        },
        mouseleave: function() {
          if(scope.inGame) {
            scope.$apply(function() {
              scope.btn.class = 'btn-success';
              scope.btn.icon = 'glyphicon-ok';
              scope.btn.text = 'In game';
            });
          }
        },
        click: function() {
          if(scope.inGame) {
            Games.removePlayer(game._id, user._id).then(function(res) {
              if(res && !res.error) {
                toaster.pop('success', 'Left game', 'You just left ' + scope.game.title);
                scope.inGame = false;
                scope.btn.class = 'btn-success';
                scope.btn.icon = 'glyphicon-plus';
                scope.btn.text = 'Join game';
                scope.game.players.splice(scope.game.players.indexOf(user), 1);
              } else {
                toaster.pop('error', 'Oops! There was an issue', res.error.message);
              }
            });
          } else {
            Games.addPlayer(game._id, user._id).then(function(res) {
              if(res && !res.error) {
                toaster.pop('success', 'Joined game', 'You just joined ' + scope.game.title);
                scope.inGame = true;
                scope.btn.class = 'btn-success';
                scope.btn.icon = 'glyphicon-ok';
                scope.btn.text = 'In game';
                scope.game.players.push(user);
              } else {
                toaster.pop('error', 'Oops! There was an issue', res.error.message);
              }
            });
          }
        }
      });
    }
  }
}]);