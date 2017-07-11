OvadiaApp.controller('profileComponentCtrl', ['$scope', 'appServices', 'ngDialog', '$timeout','$http',
    function ($scope, appServices, ngDialog, $timeout, $http) {
        var self = this;
        $scope.Article = {};

        self.init = function () {
           // $scope.tfilot_loader = true;
            $scope.articleId = 1;
            $scope.GetArticle();
        }

        $scope.GetArticle = function () {
            $scope.loader = true;
            $http.get("/ArticleSer/GetArticleById?articleId=" + $scope.articleId)
                .then(function (response) {
                    var ErrorCode;
                    try {
                        ErrorCode = response.data.ErrorCode;
                    }
                    catch (e) {
                        ErrorCode = 1;
                    }
                    if (ErrorCode == 0) {
                        $scope.Article = response.data.Data;
                        $scope.isNewArticle = false;
                    }
                    $scope.loader = false;
                });
        }

        self.init();
    }]);

OvadiaApp.directive('profileComponent', function () {
    return {
        restrict: 'E',
        bindToController: true,
        controller: 'profileComponentCtrl',
        templateUrl: '/Scripts/OvadiaApp/profile-component/profile-component.html'
    }
});