﻿OvadiaApp.controller('editMoviesCtrl', ['$scope', 'appServices', 'ngDialog', '$timeout', '$state', '$stateParams',
    '$state','$rootScope',
    function ($scope, appServices, ngDialog, $timeout, $state, $stateParams, $state, $rootScope) {
        var self = this;
        $scope.Articles = [];
        $scope.catNames = [];
        $scope.Article = {};
        $scope.ArticleCat = null;

        self.init = function () {
            $scope.getAllCategories();
            if ($stateParams.category!= null) {
                $scope.categorySelected = $stateParams.category;
                $scope.chooseCategory($scope.categorySelected); 
            }
        }

        $scope.getIndexFromValue = function (obj) {
            if ($rootScope.categoriesData == null)
                return;

            for (var i = 0; i < $rootScope.categoriesData.length; i++) {
                if ($rootScope.categoriesData[i].Id == obj.Id)
                    return i;
            }
        }

        $scope.getAllCategories = function () {
            $scope.loader = true;
            appServices.GetAllCategories().then(function (data) {
                if (data.ErrorCode == 0) {
                    $rootScope.categoriesData = data.Data;
                }
                else {
                    $scope.OpenPopup("שגיאה בלתי צפויה!", "נסה להתחבר מחדש, ואם הבעיה איננה נפתרת פנה למנהל האתר");
                }

                $scope.loader = false;
            });
        }

        $scope.getIframeSrc = function (link) {
            return link;
        }

        $scope.goToArticle = function (Id) {
            $state.go("admin.add-movie", { articleId: Id, category: $scope.categorySelected });
        }

        $scope.myStyle = function (article) {
            var style = {
                "background-image": "url(" + article.ProfilePic + ")",
            }
            return style;
        }

        $scope.chooseCategory = function (category) {
            appServices.GetArticlesByCategoryId(category.Id).then(function (data) {
                if (data.ErrorCode == 0) {
                    var index = $scope.getIndexFromValue(category)
                    if (index != null) {
                        $scope.ArticleCat = $rootScope.categoriesData[index];
                    }
                    $scope.Articles = data.Data;
                    angular.forEach($scope.Articles, function (value, key) {
                        value.YoutubeLink1 = "https://www.youtube.com/embed/" + value.Video1;
                        value.YoutubeLink2 = "https://www.youtube.com/embed/" + value.Video1;
                        value.YoutubeLink3 = "https://www.youtube.com/embed/" + value.Video1;
                    });
                }
                else {
                    $scope.OpenPopup("שגיאה בלתי צפויה!", "נסה להתחבר מחדש, ואם הבעיה איננה נפתרת פנה למנהל האתר");
                }
            
                $scope.categorySelected = category;
            });
        }

        self.init();
    }]);


OvadiaApp.directive('editMovies', function () {
    return {
        restrict: 'E',
        bindToController: true,
        controller: 'editMoviesCtrl',
        templateUrl: '/Scripts/OvadiaApp/Admin/Movies/edit-movies/edit-movies.html'
    }
});