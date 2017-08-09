OvadiaApp.controller('movieCategoryCtrl', ['$scope', 'appServices', 'ngDialog', '$timeout', '$interval',
    '$rootScope',
    function ($scope, appServices, ngDialog, $timeout, $interval, $rootScope) {
        var self = this;
        $scope.Articles = [];
        $scope.showSubSub = false, $scope.showSub = false;
        var promisse;

        self.init = function () {
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
            if (article.profImage == null || article.profImage == '') {
                //var style = {
                //    "background-image": "url(/Content/images/default.png)"
                //}
                //return style; 
                return "background-image:url(/Content/images/default.png)";
            }

            var urlNoSpace = article.profImage.split(' ').join('%20');
            //var style = {
            //    "background-image": "url(" + urlNoSpace + ")",
            //}
            // return style;
            return "background-image: url(" + urlNoSpace + ")";
        }

        $scope.getAllCategories = function () {
            $scope.loader = true;
            appServices.GetAllActiveCategoriesAcceptId(15).then(function (data) {
                if (data.ErrorCode == 0) {
                    $rootScope.categoriesData = data.Data;
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
                }
                else {
                }

                $scope.loader = false;

            });
        }

        $scope.ChangeCategory = function (item) {
            $scope.loader = true;
            appServices.GetAllChildrensCategoriesById(item.id).then(function (data) {
                if (data.ErrorCode == 0) {
                    $rootScope.categoriesSubData = data.Data;
                    if ($rootScope.categoriesSubData.length > 0) {
                        $scope.showSub = true;
                    }
                    else {
                        $scope.showSub = false;
                    }
                }
                else {
                }

                $scope.loader = false;

            });
        }

        $scope.ChangeSubCategory = function (item) {
            debugger;
            $scope.loader = true;
            appServices.GetAllChildrensCategoriesById(item.Id).then(function (data) {
                if (data.ErrorCode == 0) {
                    $rootScope.categoriesSubSubData = data.Data

                    if ($rootScope.categoriesSubSubData.length > 0) {
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