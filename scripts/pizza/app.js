angular.module('app', [
    'ui.router'
]).config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
     $stateProvider.state('login', {
        url: '/login',
        templateUrl: '../../views/login.html',
        controller: 'loginController'
    }).state('registration', {
        url: '/registration',
        templateUrl: '../../views/registration.html',
        controller: 'registrationController'
    }).state('home', {
        url: '/home',
        templateUrl: '../../views/home.html',
        controller: 'homeController'
    }).state('home.cart', {
        url: '/cart',
        templateUrl: '../../views/cart.html',
        controller: 'cartController'
    }).state('home.history', {
        url: '/history',
        templateUrl: '../../views/history.html',
        controller: 'historyController'
    }).state('home.product', {
        url: '/product',
        templateUrl: '../../views/product.html',
        controller: 'productController'
    });
    
    $urlRouterProvider.otherwise('/login');
}]).controller('appController', function($scope) {
    
}).service('appService', function($http) {

    this.app = {
        userDetails: {},
        currentCartDetails: [],
        isLoaderStart: false
    };

    this.setCurrentCartDetails = function setCurrentCartDetails(details) {
        if (angular.isArray(details)) {
            this.app.currentCartDetails = details;
        } else if (details) {
            this.app.currentCartDetails.push(details);
        }
    };
    
    this.getCurrentCartDetails = function getCurrentCartDetails() {
        return this.app.currentCartDetails;
    };

    this.getOrPostDetails = function getOrPostDetails(config) {
        return $http(config);
    };

    this.loaderStart = function loaderStart() {
        this.app.isLoaderStart = true;
    };

    this.loaderStop = function loaderStop() {
        this.app.isLoaderStart = false;
    };

});