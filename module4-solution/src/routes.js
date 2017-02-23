(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/menu/templates/home.template.html'
  })

  // Categories page
  .state('categories', {
    url: '/categories',
    templateUrl: 'src/menu/templates/categories.template.html',
    controller: 'CategoriesController as menudata',
    resolve: {
      categories: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getAllCategories()
          .then(function(categories) {
            return categories.data;
          });
      }]
    }
  })

  // Category Data
  .state('items', {
    url: '/items/{shortName}',
    templateUrl: 'src/menu/templates/items.template.html',
    controller: 'ItemsController as categorydata',
    resolve: {
      items: ['$stateParams', 'MenuDataService', function ($stateParams, MenuDataService) {
        return MenuDataService.getItemsForCategory($stateParams.shortName)
          .then(function (items) {
            return items.data;
          });
      }]
    }
  });

}

})();