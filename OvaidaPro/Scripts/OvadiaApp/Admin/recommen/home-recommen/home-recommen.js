OvadiaApp.controller('homeRecommCtrl', ['$scope',
    '$timeout', '$http', '$rootScope', 'ngDialog', 'appServices',
    function ($scope, $timeout, $http, $rootScope, ngDialog, appServices) {
        var self = this;
        $scope.radio = 2;
        self.init = function () {
           
        }

        self.init();

    }]);


OvadiaApp.directive('homeRecomm', function () {
    return {
        restrict: 'E',
        bindToController: true,
        controller: 'homeRecommCtrl',
        templateUrl: '/Scripts/OvadiaApp/Admin/recommen/home-recommen/home-recommen.html'
    }
});