OvadiaApp.controller('imageGalleryCtrl', ['$scope',
    function ($scope) {
        var currentDialog = null;
        $scope.currentEvent = null;


    }]);

OvadiaApp.directive('imageGallery', function () {
    return {
        restrict: 'E',
        bindToController: true,
        controller: 'imageGalleryCtrl',
        templateUrl: '/Scripts/OvadiaApp/image-gallery/image-gallery.html'
    }
});