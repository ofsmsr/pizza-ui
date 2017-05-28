angular.module('app').controller('homeController', function ($scope,
    appService) {
    
    $scope.currentCartDetails = function currentCartDetails() {
        return appService.getCurrentCartDetails();
    };

    function init() {
        getCartDetails();
    }
    
    function getCartDetails() {
        var config = {			
			method: 'GET',
			url: 'http://127.0.0.1:9000/cart?userId=' + appService.app.userDetails._id
		};
        appService.loaderStart();
        appService.getOrPostDetails(config).then(function (cartRes) {
            if (cartRes.data.content && cartRes.data.content.length) {
                appService.setCurrentCartDetails(cartRes.data.content);
            }
        }).catch(function (cartErr) {
            console.log(cartErr);
        }).finally(function () {
            appService.loaderStop();
        });
    }

    $scope.getLoaderFlag = function getLoaderFlag() {
        return appService.app.isLoaderStart;
    };

    init();
    
});