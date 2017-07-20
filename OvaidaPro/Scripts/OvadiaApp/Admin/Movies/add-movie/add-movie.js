﻿OvadiaApp.controller('addMovieCtrl', ['$scope',
    '$timeout', '$http', '$rootScope', 'ngDialog', 'appServices', '$stateParams','$state',
    function ($scope, $timeout, $http, $rootScope, ngDialog, appServices, $stateParams, $state) {
        var self = this;
        $scope.isNewArticle = true;

        self.init = function () {
            $scope.getAllActiveCategories();

            if ($stateParams.category != null) {
                $scope.showBackButton = true;
                $scope.category = $stateParams.category;
            }

            if ($stateParams.articleId != null) {
                $scope.articleId = $stateParams.articleId;
                $scope.GetArticle();
            }
            else if (window.location.href.indexOf("id") > 0) {
                $scope.articleId = window.location.href.substr(35, 4);
                $scope.GetArticle();
            }
            //  }
            //else {
            //   $scope.Categories = "";
            // }
        }

        $scope.backToCategory = function () {
            $state.go("admin.edit-movies", { category: $scope.category});
        }

        $scope.SelectChange = function (item) {
            $scope.Article.CategoryName = item.Name;
            $scope.Article.CategoryId = item.Id;
        }

        $scope.AddArticle = function () {
            $scope.loader = true;
            appServices.AddArticle($scope.Article)
                .then(function (data) {
                var ErrorCode;
                try {
                    ErrorCode = data.ErrorCode;
                }
                catch (e) {
                    ErrorCode = 1;
                }
                if (ErrorCode == 0) {
                    $scope.OpenPopup("מאמר נשמר בהצלחה!", "תוכל להמשיך לערוך את המאמר");
                    $scope.Article = data.Data;
                    $scope.isNewArticle = false;
                }
                else {
                    $scope.OpenPopup("שגיאה בלתי צפויה!", "נסה להתחבר מחדש, ואם הבעיה איננה נפתרת פנה למנהל האתר");
                }
                $scope.loader = false;
            });
        }

        $scope.GetArticle = function () {
            $scope.loader = true;
            appServices.GetArticle($scope.articleId)
                .then(function (data) {
                var ErrorCode;
                try {
                    ErrorCode = data.ErrorCode;
                }
                catch (e) {
                    ErrorCode = 1;
                }
                if (ErrorCode == 0) {
                    $scope.Article = data.Data;
                    $scope.isNewArticle = false;
                }
                else {
                    $scope.OpenPopup("שגיאה בלתי צפויה!", "נסה להתחבר מחדש, ואם הבעיה איננה נפתרת פנה למנהל האתר");
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
        templateUrl: '/Scripts/OvadiaApp/Admin/Movies/add-movie/add-movie.html'
    }
});