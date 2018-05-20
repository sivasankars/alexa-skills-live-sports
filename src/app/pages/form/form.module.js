/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.form', [])
    .config(routeConfig)
    .controller('notification', function ($scope, $http, toastr) {
      $scope.submit = function (message) {
        console.log("submitsubmitsubmitsubmitsubmitsubmitsubmit", message);

        $http({
          method: 'POST',
          url: '/notification',
          data: { 'message': message }
        }).then(function successCallback(response) {
          toastr.success("Success");
        }, function errorCallback(response) {
          toastr.error("Error");
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });

      };
    });

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('Broadcast', {
        url: '/broadcast',
        templateUrl: 'app/pages/form/layouts/layouts.html',
        title: 'Broadcast',
        controller: 'notification',
        sidebarMeta: {
          icon: 'ion-grid',
          order: 250,
        },
      })
  }

})();
