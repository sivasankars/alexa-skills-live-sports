'use strict';

angular.module('BlurAdmin', [
  'ngAnimate',
  'ui.bootstrap',
  'ui.router',
  'ngTouch',
  'toastr',
  "xeditable",
  'ui.slimscroll',

  'BlurAdmin.theme',
  'BlurAdmin.pages'
]);

angular.module('BlurAdmin.pages', [
  'ui.router',

  'BlurAdmin.pages.dashboard',
  'BlurAdmin.pages.form',
  'BlurAdmin.pages.tables'
])
  .config(routeConfig);

/** @ngInject */
function routeConfig($urlRouterProvider, baSidebarServiceProvider) {
  $urlRouterProvider.otherwise('/dashboard');
}
