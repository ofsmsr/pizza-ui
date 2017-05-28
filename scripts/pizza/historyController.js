angular.module('app').controller('historyController', function($scope,
    appService) {
    $scope.historyDetails = [];

    function init() {
        getOrderHistory();
    }

    function getOrderHistory() {
        var config = {			
			method: 'GET',
			url: 'http://127.0.0.1:9000/order?userId=' + appService.app.userDetails._id
		};
        appService.loaderStart();
        appService.getOrPostDetails(config).then(function (historyRes) {
            $scope.historyDetails = historyRes.data.content;
        }).catch(function (historyErr) {
            console.log(historyErr);
        }).finally(function () {
            appService.loaderStop();
        });
    }

    init();

});