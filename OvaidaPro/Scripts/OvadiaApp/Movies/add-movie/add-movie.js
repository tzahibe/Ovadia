OvadiaApp.controller('addMovieCtrl', ['$scope', 'appServices', 'ngDialog', '$timeout', '$interval',
    function ($scope, appServices, ngDialog, $timeout, $interval) {
        var self = this;

        self.init = function () {

        }

        self.init();
    }]);

OvadiaApp.directive('addMovie', function () {
    return {
        restrict: 'E',
        bindToController: true,
        controller: 'addMovieCtrl',
        templateUrl: '/Scripts/OvadiaApp/Movies/add-movie/add-movie.html'
    }
});