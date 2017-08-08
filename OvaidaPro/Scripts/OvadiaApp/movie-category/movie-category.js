OvadiaApp.controller('movieCategoryCtrl', ['$scope', 'appServices', 'ngDialog', '$timeout', '$interval',
    function ($scope, appServices, ngDialog, $timeout, $interval) {
        var self = this;
        var promisse;

        self.init = function () {

        }


        self.init();
    }]);

OvadiaApp.directive('movieCategory', function () {
    return {
        restrict: 'E',
        bindToController: true,
        controller: 'movieCategoryCtrl',
        templateUrl: '/Scripts/OvadiaApp/movie-category/movie-category.html'
    }
});