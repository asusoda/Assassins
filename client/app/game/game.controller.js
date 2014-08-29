'use strict';

angular.module('assassinsApp')
  .controller('GameCtrl', function ($scope) {
    $scope.message = 'Hello';
  });

angular.module('assassinsApp')
  .controller('GameCreateCtrl', function ($scope, Games) {
    $scope.formData = {};
    $scope.formData.game = {};

    $scope.create = function() {
      Games.create($scope.formData).then(function(res) {
        if(res && !res.error) {

        } else {
          console.log('Oops, there was an error: ' + res.error);
        }
      });
    }
  });

angular.module('assassinsApp')
  .controller('GamePageCtrl', function ($scope) {
    $scope.message = 'Hello';
  });
