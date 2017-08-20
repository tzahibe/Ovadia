OvadiaApp.controller('recommenComponentCtrl', ['$scope', 'appServices', 'ngDialog', '$timeout', '$http',
    function ($scope, appServices, ngDialog, $timeout, $http) {
        var self = this;
        $scope.Recomm = {};

        self.init = function () {
            $scope.getAllRecomm();
        }

        $scope.getAllRecomm = function () {
            appServices.GetAllActiveRecomm().then(function (data) {
                if (data.ErrorCode == 0) {
                    $scope.Recomm = data.Data;
                }
                else {
                   // alert("error");
                }
            });
        }

        $scope.OpenLetter = function (recom) {
            $scope.OpenPopup("מכתב", recom.Image1);
        }

        $scope.OpenPopup = function (title, msg) {
            $scope.Title = title;
            $scope.Msg = msg;
            ngDialog.open({
                template: '/Scripts/OvadiaApp/Admin/events-dialog/recomm-image.html',
                //className: 'ngdialog-theme-default',
                scope: $scope
            });
        }


        self.init();
    }]);

OvadiaApp.directive('recommenComponent', function () {
    return {
        restrict: 'E',
        bindToController: true,
        controller: 'recommenComponentCtrl',
        templateUrl: '/Scripts/OvadiaApp/recommen-component/recommen-component.html'
    }
});