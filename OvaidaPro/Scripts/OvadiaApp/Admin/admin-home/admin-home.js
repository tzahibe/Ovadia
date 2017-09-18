OvadiaApp.controller('adminHomeCtrl', ['$scope', '$interval', 'appServices', 'ngDialog',
    function ($scope, $interval, appServices, ngDialog) {
        self = this;

        self.init = function () {///

        }

        self.init();

    }]);


OvadiaApp.directive('adminHome', function () {
    return {
        restrict: 'E',
        bindToController: true,
        controller: 'adminHomeCtrl',
        templateUrl: '/Scripts/OvadiaApp/Admin/admin-home/admin-home.html'
    }
});