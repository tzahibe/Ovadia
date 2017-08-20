OvadiaApp.controller('editRecommenCtrl', ['$scope', 'appServices', 'ngDialog', '$timeout', '$http', "$state",
    '$rootScope',
    function ($scope, appServices, ngDialog, $timeout, $http, $state, $rootScope) {
        var self = this;
        $scope.Recomm = [];

        self.init = function () {
            $scope.getallComm();
        }

        $scope.getallComm = function () {
            appServices.GetAllRecomm().then(function (data) {
                if (data.ErrorCode == 0) {
                    $scope.Recomm = data.Data;
                }
                else if (data.ErrorCode == 5) {
                    $rootScope.LogOut();
                }
                else {
                    alert("error");
                }
            });
        }

        $scope.getIframeSrc = function (link) {
            return link;
        }

        $scope.goToRecomm = function (recomm) {
            $state.go("admin.add-recommen", { Recomm: recomm });
        }

        $scope.myStyle = function (article) {
            if (article.ProfilePic == null || article.ProfilePic == '') {
                return "background-image:url(/Content/images/default.png)";
            }

            var urlNoSpace = article.ProfilePic.split(' ').join('%20');
            return "background-image: url(" + urlNoSpace + ")";
        }

        self.init();
    }]);

OvadiaApp.directive('editRecommen', function () {
    return {
        restrict: 'E',
        bindToController: true,
        controller: 'editRecommenCtrl',
        templateUrl: '/Scripts/OvadiaApp/Admin/recommen/edit-recommen/edit-recommen.html'
    }
});