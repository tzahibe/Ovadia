OvadiaApp.controller('movieDetailsCtrl', ['$scope', 'appServices', 'ngDialog', '$timeout', '$interval',
    function ($scope, appServices, ngDialog, $timeout, $interval) {
        var self = this;
        var promisse;

        self.init = function () {
           
        }

       
        self.init();
    }]);

OvadiaApp.directive('movieDetails', function () {
    return {
        restrict: 'E',
        bindToController: true,
        controller: 'movieDetailsCtrl',
        templateUrl: '/Scripts/OvadiaApp/movie-details/movie-details'
    }
});