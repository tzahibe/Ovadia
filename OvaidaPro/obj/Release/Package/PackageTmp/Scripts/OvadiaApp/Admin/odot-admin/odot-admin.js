OvadiaApp.controller('odotAdminCtrl', ['$scope',
    '$timeout', '$http', '$rootScope', 'ngDialog',
    function ($scope, $timeout, $http, $rootScope, ngDialog)
    {
        var self = this;
        $scope.isNewArticle = true;

        self.init = function () {
           // if ($scope.articleId != null && $scope.articleId != "") {
                $scope.articleId = 1;
                $scope.isNewArticle = false;
                $scope.GetArticle();
          //  }
            //else {
             //   $scope.Categories = "";
           // }
        }

        //$scope.SelectChange = function (item) {
        //    $scope.Article.CategoryName = item.Name;
        //    $scope.Article.CategoryId = item.id;
        //}

        //$scope.AddArticle = function () {
        //    $scope.loader = true;
        //    $http.post("/Article/AddArticle", $scope.Article)
        //        .then(function (response) {
        //            var ErrorCode;
        //            try {
        //                ErrorCode = response.data.ErrorCode;
        //            }
        //            catch (e) {
        //                ErrorCode = 1;
        //            }
        //            if (ErrorCode == 0) {
        //                $scope.OpenPopup("מאמר נשמר בהצלחה!", "תוכל להמשיך לערוך את המאמר");
        //                $scope.Article = response.data.Data;
        //                $scope.isNewArticle = false;
        //            }
        //            $scope.loader = false;
        //        });
        //}

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

        $scope.EditArticle = function () {
            $scope.loader = true;
            $http({
                method: 'POST',
                url: "/ArticleSer/EditArticle",
                data: $scope.Article,
                dataType: 'json',
                contentType: "application/json; charset=utf-8"
            }).then(function (response) {
                var ErrorCode;
                try {
                    ErrorCode = response.data.ErrorCode;
                }
                catch (e) {
                    ErrorCode = 1;
                }
                if (ErrorCode == 0) {
                    $scope.OpenPopup("מאמר עודכן בהצלחה!", "תוכל להמשיך לערוך את המאמר");
                    $scope.Article = response.data.Data;
                    $scope.isNewArticle = false;
                }
                $scope.loader = false;
            });
        }

        //$scope.RemoveArticleById = function () {
        //    $scope.loader = true;
        //    $http.get("/Article/RemoveArticleById?articleId=" + $scope.Article.ArticleId)
        //        .then(function (response) {
        //            var ErrorCode;
        //            try {
        //                ErrorCode = response.data.ErrorCode;
        //            }
        //            catch (e) {
        //                ErrorCode = 1;
        //            }
        //            if (ErrorCode == 0) {
        //                $scope.OpenPopup("מאמר הוסר בהצלחה!", "תוכל ליצור מאמר חדש");
        //                $scope.Article = response.data.Data;
        //                $scope.isNewArticle = false;
        //            }
        //            else {
        //                $scope.OpenPopup("שגיאה בלתי צפויה!", "נסה להתחבר מחדש, ואם הבעיה איננה נפתרת פנה למנהל האתר");
        //            }
        //            $scope.loader = false;
        //        });
        //}

        $scope.OpenPopup = function (title, msg) {
            $scope.Title = title;
            $scope.Msg = msg;
            ngDialog.open({
                template: '/Scripts/OvadiaApp/Admin/events-dialog/popup-screen.html',
                className: 'ngdialog-theme-default',
                scope: $scope
            });
        }

        self.init();

    }]);

OvadiaApp.directive('odotAdmin', function () {
    return {
        restrict: 'E',
        bindToController: true,
        controller: 'odotAdminCtrl',
        templateUrl: '/Scripts/OvadiaApp/odot-admin/odot-admin.html'
    }
});