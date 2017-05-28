angular.module('app').controller('cartController', function($scope,
    $state,
    appService) {
    $scope.cartDetails = appService.getCurrentCartDetails();
    $scope.checkOut = function checkOut() {
        var productDetails = _.pluck($scope.cartDetails, 'productDetails');
         var payload= {
            'userId': appService.app.userDetails._id,
            'productDetails': productDetails,
            'amount': _.pluck(productDetails, 'amount').reduce(function (a, b) {return a + b;}),
            'date': moment().format('DD/MM/YYYY')
        };
        var config = {			
			method: 'POST',
			url: 'http://127.0.0.1:9000/order',
			data: payload
		};
        appService.loaderStart();
        appService.getOrPostDetails(config).then(function (orderRes) {
            alert(orderRes.data.message);
            deleteUserCart();
        }).catch(function (orderErr) {
            console.log(orderErr);
        }).finally(function () {
            appService.loaderStop();
        });
    };

    function deleteUserCart() {
        var config = {			
			method: 'DELETE',
			url: 'http://127.0.0.1:9000/cart?userId=' + appService.app.userDetails._id
		};
        appService.loaderStart();
        appService.getOrPostDetails(config).then(function (deleteUserCartRes) {
            appService.setCurrentCartDetails([]);
            $scope.cartDetails = [];
            $state.go('home.history');
        }).catch(function (deleteUserCartErr) {
            console.log(deleteUserCartErr);
        }).finally(function () {
            appService.loaderStop();
        });
    }

});