OvadiaApp.controller('commentInfoCtrl', ['$scope', '$rootScope', 'ngDialog', 'appServices', 'UserAccount',
    '$state', '$cookies',
    function ($scope, $rootScope, ngDialog, appServices, UserAccount, $state, $cookies) {
        $scope.Comment = {};
        var self = this;

        self.init = function () {
            $rootScope.GetComment();
        }

        $scope.saveComment = function () {
            $scope.loaderSend = true;
            appServices.CommentSave($scope.Comment).then(function (data) {
                if (data.ErrorCode == 0) {
                    $scope.Comment = data.Data;
                }
                else {
                    alert("error");
                }
                $scope.loaderSend = false;
            });
        }

        $rootScope.GetComment = function () {
            appServices.GetComment().then(function (data) {
                if (data.ErrorCode == 0) {
                    $scope.Comment = data.Data;
                }
                else {
                    alert("error");
                }
                $scope.loaderSend = false;
            })
        }

        self.init();
    }]);

OvadiaApp.directive('commentInfo', function () {
    return {
        restrict: 'E',
        bindToController: true,
        controller: 'commentInfoCtrl',
        templateUrl: '/Scripts/OvadiaApp/Admin/comment-info/comment-info.html'
    }
});