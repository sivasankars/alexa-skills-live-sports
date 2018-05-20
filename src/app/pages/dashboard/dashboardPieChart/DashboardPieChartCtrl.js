/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages').controller('DashboardPieChartCtrl', DashboardPieChartCtrl);

  /** @ngInject */
  function DashboardPieChartCtrl($scope, $timeout, baConfig, baUtil, toastr, $http) {

    //console.log(tableData);
    $http.get('/dashboard')
      .then(function (response) {
        toastr.info("Welcome to Interactive Sports", "Welcome");
        $scope.charts = [{
          description: 'Users',
          stats: response.data.session,
          icon: 'ion-person-stalker',
          href: 'users',
        }, {
          description: 'Interaction',
          stats: response.data.interaction,
          icon: 'ion-chatboxes',
          href: 'users',
        }, {
          description: 'Notification',
          stats: response.data.notification,
          icon: 'ion-ios-football-outline',
          href: 'users',
        }, {
          description: 'Deals',
          stats: response.data.deal,
          icon: 'ion-social-usd',
          href: 'users',
        }
        ];

      })
  }
})();