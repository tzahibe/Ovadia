OvadiaApp.controller('homeMoviesCtrl', ['$scope',
    '$timeout', '$http', '$rootScope', 'ngDialog', 'appServices',
    function ($scope, $timeout, $http, $rootScope, ngDialog, appServices) {
        var self = this;
        $scope.radio = 1;
        self.init = function () {
           
        }

        self.init();

    }]);


OvadiaApp.directive('homeMovies', function () {
    return {
        restrict: 'E',
        bindToController: true,
        controller: 'homeMoviesCtrl',
        templateUrl: '/Scripts/OvadiaApp/Admin/Movies/home-movies/home-movies.html'
    }
});