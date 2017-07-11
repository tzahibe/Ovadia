OvadiaApp.controller('mapaComponentCtrl', ['$scope', 'appServices', 'ngDialog', '$timeout','$interval',
    function ($scope, appServices, ngDialog, $timeout, $interval) {
        var self = this;
        var promisse;

        self.init = function () {
            $scope.startPromise();
        }

        $scope.startPromise = function () {
            $scope.loader = true;
            promise = $interval(function () {
                var isExist = $('#googmap').length > 0;
                if (isExist) {
                    $scope.stopInterval();
                    $scope.loader = false;
                }
            },800);
        }

        $scope.stopInterval = function () {
            $interval.cancel(promise);
        }

        self.init();
    }]);

OvadiaApp.directive('mapaComponent', function () {
    return {
        restrict: 'E',
        bindToController: true,
        controller: 'mapaComponentCtrl',
        templateUrl: '/Scripts/OvadiaApp/mapa-component/mapa-component.html'
    }
});