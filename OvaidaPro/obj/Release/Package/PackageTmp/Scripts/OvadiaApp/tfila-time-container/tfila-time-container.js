OvadiaApp.controller('tfilaTimeContainerCtrl', ['$scope', 'appServices', 'ngDialog', '$timeout',
    function ($scope, appServices, ngDialog, $timeout) {
        var self = this;
        $scope.Tfilot = {};
        $scope.ErrorMsg = false;

        self.init = function () {
            $scope.loader1 = true;
            appServices.getAllTfilot().then(function (response) {
                if (response.data.ErrorCode == 0) {
                    $scope.Tfilot.data = response.data.Data;
                    $scope.loader1 = false;
                    $scope.ErrorMsg = false;
                }
                else {
                    $scope.loader1 = false;
                    $scope.ErrorMsg = true;
                }
            });
        }
    
        self.init();
    }]);

OvadiaApp.directive('tfilaTimeContainer', function () {
    return {
        restrict: 'E',
        bindToController: true,
        controller: 'tfilaTimeContainerCtrl',
        templateUrl: '/Scripts/OvadiaApp/tfila-tile-container/tfila-tile-container.html'
    }
});