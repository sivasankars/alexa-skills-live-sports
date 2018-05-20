/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.tables').controller('TablesPageCtrl', TablesPageCtrl);

  /** @ngInject */
  function TablesPageCtrl($scope, $filter, editableOptions, editableThemes, tableData) {
    $scope.smartTablePageSize = 10;
    $scope.smartTableData = tableData;
  }

  angular.module('BlurAdmin.pages.tables').controller('NTablesPageCtrl', NTablesPageCtrl);

  /** @ngInject */
  function NTablesPageCtrl($scope, $filter, editableOptions, editableThemes, tableData) {
    $scope.smartTablePageSize = 10;

    console.log(tableData);
    $scope.smartTableData = tableData;
  }

})();
