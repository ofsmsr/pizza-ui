angular.module('app').controller('loginController', function ($scope,
    $state,
    appService) {
    $scope.onSignIn = function onSignIn(user) {
        var config = {			
			method: 'POST',
			url: 'http://127.0.0.1:9000/login',
			data: user
		};
        appService.loaderStart();
        appService.getOrPostDetails(config).then(function (loginRes) {
            appService.app.userDetails = loginRes.data.content;
            $state.go('home.product');
        }).catch(function (loginErr) {
            console.log(loginErr);
        }).finally(function () {
            appService.loaderStop();
        });
    };

    $scope.onSignUp = function onSignUp() {
        $state.go('registration');
    };
});