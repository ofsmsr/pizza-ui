angular.module('app').controller('productController', function($scope,
    appService) {
    $scope.home = {
        products: [
            {
                productId: 'P101',
                productName: 'Pizza 101',
                amount: 5
            },
            {
                productId: 'P102',
                productName: 'Pizza 102',
                amount: 5
            },
            {
                productId: 'P103',
                productName: 'Pizza 103',
                amount: 5
            },
            {
                productId: 'P104',
                productName: 'Pizza 104',
                amount: 5
            }
        ]
    };

    $scope.addToCart = function addToCart(productDetails) {
        var payload= {
            'userId': appService.app.userDetails._id,
            'productDetails': productDetails,
            'date': moment().format('DD/MM/YYYY')
        };
        var config = {			
			method: 'POST',
			url: 'http://127.0.0.1:9000/cart',
			data: payload
		};

        appService.loaderStart();
        appService.getOrPostDetails(config).then(function (cartRes) {
            appService.setCurrentCartDetails({productDetails: productDetails});
        }).catch(function (cartErr) {
            console.log(cartErr);
        }).finally(function () {
            appService.loaderStop();
        });
    };
    
});