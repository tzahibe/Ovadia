OvadiaApp.controller('addMovieCtrl', ['$scope',
    '$timeout', '$http', '$rootScope', 'ngDialog','appServices',
    function ($scope, $timeout, $http, $rootScope, ngDialog, appServices) {
        var self = this;
        $scope.isNewArticle = true;

        self.init = function () {
            $scope.getAllActiveCategories();
            if (window.location.href.indexOf("id") > 0) {
                $scope.articleId = window.location.href.substr(35, 4);
                $scope.GetArticle();
            }
            //  }
            //else {
            //   $scope.Categories = "";
            // }
        }

        $scope.SelectChange = function (item) {
            $scope.Article.CategoryName = item.Name;
            $scope.Article.CategoryId = item.id;
        }

        $scope.AddArticle = function () {
            $scope.loader = true;
            $http.post("/ArticleSer/AddArticle", $scope.Article)
                .then(function (response) {
                    var ErrorCode;
                    try {
                        ErrorCode = response.data.ErrorCode;
                    }
                    catch (e) {
                        ErrorCode = 1;
                    }
                    if (ErrorCode == 0) {
                        $scope.OpenPopup("מאמר נשמר בהצלחה!", "תוכל להמשיך לערוך את המאמר");
                        $scope.Article = response.data.Data;
                        $scope.isNewArticle = false;
                    }
                    $scope.loader = false;
                });
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

        $scope.RemoveArticleById = function () {
            $scope.loader = true;
            $http.get("/ArticleSer/RemoveArticleById?articleId=" + $scope.Article.ArticleId)
                .then(function (response) {
                    var ErrorCode;
                    try {
                        ErrorCode = response.data.ErrorCode;
                    }
                    catch (e) {
                        ErrorCode = 1;
                    }
                    if (ErrorCode == 0) {
                        $scope.OpenPopup("מאמר הוסר בהצלחה!", "תוכל ליצור מאמר חדש");
                        $scope.Article = response.data.Data;
                        $scope.isNewArticle = false;
                    }
                    else {
                        $scope.OpenPopup("שגיאה בלתי צפויה!", "נסה להתחבר מחדש, ואם הבעיה איננה נפתרת פנה למנהל האתר");
                    }
                    $scope.loader = false;
                });
        }

        $scope.OpenPopup = function (title, msg) {
            $scope.Title = title;
            $scope.Msg = msg;
            ngDialog.open({
                template: '/Scripts/OvadiaApp/Admin/events-dialog/popup-screen.html',
                className: 'ngdialog-theme-default',
                scope: $scope
            });
        }

        $scope.getAllActiveCategories = function () {
            $scope.loader = true;
            appServices.GetAllActiveCategories().then(function (data) {
                if (data.ErrorCode == 0) {
                    $scope.categoriesData = data.Data;
                }
                else {
                    $scope.OpenPopup("שגיאה בלתי צפויה!", "נסה להתחבר מחדש, ואם הבעיה איננה נפתרת פנה למנהל האתר");
                }

                $scope.loader = false;
            });
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