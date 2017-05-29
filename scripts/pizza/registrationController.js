angular.module('app').controller('registrationController', function ($scope,
    $state,
    appService) {
    $scope.onRegistration = function onRegistration(user) {
        var config = {			
			method: 'POST',
			url: 'http://127.0.0.1:9000/registration',
			data: user
		};
        appService.loaderStart();
        appService.getOrPostDetails(config).then(function (registrationRes) {
            alert(registrationRes.data.message);
            $state.go('login');
        }).catch(function (registrationErr) {
            console.log(registrationErr);
        }).finally(function () {
            appService.loaderStop();
        });
    };
});