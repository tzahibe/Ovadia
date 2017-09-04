OvadiaApp.controller('donationScreenCtrl', ['$scope', '$interval', 'appServices',
    function ($scope, $interval, appServices) {
        self = this;
        $scope.Articles = [];

        self.init = function () {///
         
        }


        self.init();

    }]);


OvadiaApp.directive('donationScreen', function () {
    return {
        restrict: 'E',
        bindToController: true,
        controller: 'donationScreenCtrl',
        templateUrl: '/Scripts/OvadiaApp/donation-screen/donation-screen.html'
    }
});