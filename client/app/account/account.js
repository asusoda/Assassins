'use strict';

angular.module('assassinsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/account/login/login.html',
        controller: 'LoginCtrl'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'app/account/signup/signup.html',
        controller: 'SignupCtrl'
      })
      .state('settings', {
        url: '/settings',
        templateUrl: 'app/account/settings/settings.html',
        controller: 'SettingsCtrl',
        authenticate: true
      })
      .state('user', {
        abstract: true,
        url: '/users',
        template: '<ui-view/>'
      })
      .state('user.profile', {
        url: '/:id',
        templateUrl: 'app/account/profile/views/page-user-profile.html',
        controller: 'UserProfileCtrl',
        resolve: {
          user: function($stateParams, Users) {
            return Users.getUser($stateParams.id);
          }
        }
      });
  });