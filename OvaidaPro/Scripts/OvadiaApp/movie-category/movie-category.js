﻿OvadiaApp.controller('movieCategoryCtrl', ['$scope', 'appServices', 'ngDialog', '$timeout', '$interval',
    '$rootScope',
    function ($scope, appServices, ngDialog, $timeout, $interval, $rootScope) {
        var self = this;
        $scope.Articles = [];
        $scope.showSubSub = false, $scope.showSub = false;
        var promisse;

        self.init = function () {
            $scope.loader = true;
            $scope.getAllArticles();
            $scope.getAllCategories();
            $scope.GetAllCategoires_rabi();
        }


        $scope.getAllArticles = function () {
            appServices.GetAllActiveArticles().then(function (data) {
                if (data.ErrorCode == 0) {
                    $scope.Articles = data.Data;
                    console.log($scope.Articles);

                    angular.forEach($scope.Articles, function (value, key) {
                        var profImage;
                        value.YoutubeLink1 = "https://www.youtube.com/embed/" + value.Video1;
                        value.YoutubeLink2 = "https://www.youtube.com/embed/" + value.Video1;
                        value.YoutubeLink3 = "https://www.youtube.com/embed/" + value.Video1;

                        if (value.ProfilePic == null || value.ProfilePic == '') {
                            value.profImage = "/Content/images/default.png";
                        }
                        else {
                            value.profImage = value.ProfilePic.split(' ').join('%20');;
                        }
                    });

                }
                else {
                }

            });
        }

        $scope.myStyle = function (article) {
            if (article.Video1 != null && article.Video1 != '') {
                return "background-image:url(https://i.ytimg.com/vi_webp/" + article.Video1 + "/sddefault.webp); left:5px;background-size: 100% 100%;";
            }

            if (article.profImage == null || article.profImage == '') {
                return "background-image:url(/Content/images/default.png); left:5px;background-size: 100% 100%;";
            }

            var urlNoSpace = article.profImage.split(' ').join('%20');
            //var style = {
            //    "background-image": "url(" + urlNoSpace + ")",
            //}
            // return style;
            return "background-image: url(" + urlNoSpace + "); left:5px;background-size: 100% 100%";
        }

        $scope.getAllCategories = function () {
            $scope.loader = true;
            appServices.GetAllActiveCategoriesAcceptId(15).then(function (data) {
                if (data.ErrorCode == 0) {
                    $rootScope.categoriesData = data.Data;
                    $rootScope.categoriesData.unshift({ Name: "הכל" });
                }
                else {

                }

                $scope.loader = false;

            });
        }

        $scope.GetAllCategoires_rabi = function () {
            $scope.loader = true;
            appServices.GetAllChildrensCategoriesById(15).then(function (data) {
                if (data.ErrorCode == 0) {
                    $rootScope.categoriesRabiData = data.Data;
                    $rootScope.categoriesRabiData.unshift({ Name: "הכל" });
                }
                else {
                }

                $scope.loader = false;

            });
        }

        $scope.ChangeCategory = function (item) {
            $scope.select2_1 = null;
            $scope.select2_1_1 = null;
            if (item.Name == "הכל") {
                return;
            }
            $scope.loader = true;
            
            appServices.GetAllChildrensCategoriesById(item.Id).then(function (data) {
                if (data.ErrorCode == 0) {
                    $rootScope.categoriesSubData = data.Data;
                    if ($rootScope.categoriesSubData.length > 0) {
                        $rootScope.categoriesSubData.unshift({ Name: "הכל" });
                        $scope.showSub = true;
                    }
                    else {
                        $scope.showSubSub = false;
                        $scope.showSub = false;
                    }
                }
                else {
                }

                $scope.loader = false;

            });
        }

        $scope.ChangeSubCategory = function (item) {
            $scope.select2_1_1 = null;
            if (item.Name == "הכל") {
                return;
            }
            $scope.loader = true;
            appServices.GetAllChildrensCategoriesById(item.Id).then(function (data) {
                if (data.ErrorCode == 0) {
                    $rootScope.categoriesSubSubData = data.Data
                   
                    if ($rootScope.categoriesSubSubData.length > 0) {
                        $rootScope.categoriesSubSubData.unshift({ Name: "הכל" });
                        $scope.showSubSub = true;
                    }
                    else {
                        $scope.showSubSub = false;
                    }
                }
                else {
                }

                $scope.loader = false;

            });
        }

        $scope.parentCategoryFilter = function (item) {
            
            if ($scope.select2 == null || $scope.select2.Name == "הכל") {
                console.log("parentCategoryFilter : true");
                return true;
            }
            if (item == null || item.CategoriesList == null || item.CategoriesList == "" |
                item.CategoriesList.length == 0 | $scope.select2 == null | $scope.select2 == "")
                console.log("parentCategoryFilter : false");
                return false;
            for (var i = 0; i < item.CategoriesList.length; i++) {
                if (item.CategoriesList[i].CategoryId == $scope.select2.id) {
                    console.log("parentCategoryFilter : true");
                    return true;
                }
            }
            console.log("parentCategoryFilter : false");
            return false;
        }

        $scope.subCategoryFilter = function (item) {
            
            if ($scope.select2_1 == null || $scope.select2_1.Name == "הכל") {
                console.log("subCategoryFilter : true");
                return true;
            }

            if (item == null || item.CategoriesList == null || item.CategoriesList == "" |
                item.CategoriesList.length == 0 | $scope.select2_1 == null | $scope.select2_1 == "")
                console.log("subCategoryFilter : false");
                return false;

            for (var i = 0; i < item.CategoriesList.length; i++) {
                if (item.CategoriesList[i].CategoryId == $scope.select2_1.Id) {
                    console.log("subCategoryFilter : true");
                    return true;
                }
            }

            console.log("subCategoryFilter : false");
            return false;
        }

        $scope.subSubCategoryFilter = function (item) {
            
            if ($scope.select2_1_1 == null || $scope.select2_1_1.Name == "הכל") {
                console.log("subSubCategoryFilter : true");
                return true;
            }

            if (item == null || item.CategoriesList == null || item.CategoriesList == "" |
                item.CategoriesList.length == 0 | $scope.select2_1_1 == null | $scope.select2_1_1 == "")
                console.log("subSubCategoryFilter : false");
                return false;

            for (var i = 0; i < item.CategoriesList.length; i++) {
                if (item.CategoriesList[i].CategoryId == $scope.select2_1_1.Id) {
                    console.log("subSubCategoryFilter : true");
                    return true;
                }
            }
            console.log("subSubCategoryFilter : false");
            return false;
        }

        $scope.rabiFilter = function (item) {
            
            if ($scope.select3 == null || $scope.select3.Name == "הכל") {
                console.log("rabiFilter : true");
                return true;
            }

            if (item == null || item.CategoriesList == null || item.CategoriesList == "" |
                item.CategoriesList.length == 0 | $scope.select3 == null | $scope.select3 == "")
                console.log("rabiFilter : false");
                return false;

            for (var i = 0; i < item.CategoriesList.length; i++) {
                if (item.CategoriesList[i].CategoryId == $scope.select3.Id) {
                    console.log("rabiFilter : true");
                    return true;
                }
            }
            console.log("rabiFilter : false");
            return false;
        }

        $scope.goToArticle = function (article) {
            window.location.href = '/movie-category/movie-details/' + article.ArticleId;
        }

        self.init();
    }]);

OvadiaApp.directive('movieCategory', function () {
    return {
        restrict: 'E',
        bindToController: true,
        controller: 'movieCategoryCtrl',
        templateUrl: '/Scripts/OvadiaApp/movie-category/movie-category.html'
    }
});