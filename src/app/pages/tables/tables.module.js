/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.tables', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('users', {
        url: '/users',
        templateUrl: 'app/pages/tables/smart/tables.html',
        title: 'Users',
        controller: 'TablesPageCtrl',
        resolve: {
          tableData: function ($http) {
            return $http.get('/users')
              .then(function (response) {
                console.log(response);
                return response.data;
              })
          }
        },
        sidebarMeta: {
          icon: 'ion-grid',
          order: 300,
        },
      })

      .state('Notifications', {
        url: '/notifications',
        templateUrl: 'app/pages/tables/smart/ntables.html',
        title: 'Notifications',
        controller: 'NTablesPageCtrl',
        resolve: {
          tableData: function ($http) {
            return $http.get('/notifications')
              .then(function (response) {
                console.log(response);
                return response.data;
              })
          }
        },
        sidebarMeta: {
          icon: 'ion-grid',
          order: 300,
        },
      })

    $urlRouterProvider.when('/tables', '/tables/basic');
  }
})();
