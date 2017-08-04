OvadiaApp.controller('editMoviesCtrl', ['$scope', 'appServices', 'ngDialog', '$timeout', '$state', '$stateParams',
    '$state', '$rootScope','$http',
    function ($scope, appServices, ngDialog, $timeout, $state, $stateParams, $state, $rootScope, $http) {
        var self = this;
        $scope.Articles = [];
        $scope.catNames = [];
        $scope.Article = {};
        $scope.ArticleCat = null;

        $scope.select2Options = {
            allowClear: true
        };

        self.init = function () {
            $scope.getAllCategories();
            if ($stateParams.category != null) {
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
                    console.log(data.Data);
                    $rootScope.categoriesData.unshift({Name:"הכל"});
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

        $scope.loadTags = function (query) {
            return $http.get('/CategorySer/AutoCompleteGetCategoriesByName?name=' + query);
        }

        $scope.goToArticle = function (article) {
            if ($scope.select2 != null && $scope.select2.Name == "הכל") {
                var cat = {
                    Name: $scope.select2.Name,
                    Id: null
                }
                $state.go("admin.add-movie", { articleId: article.ArticleId, category: cat });
            }
            else  {
                $state.go("admin.add-movie", { articleId: article.ArticleId, category: $scope.categorySelected });

            }
        }
        //$scope.tryGetpImage = function(url){
        //    $http.get(url).then(function (response) {
        //        if (response.status == 200)
        //            return url;
        //        else {
        //            return "/Content/images/default.png";
        //        }
        //    });
        //}

        $scope.myStyle = function (article) {
            if (article.profImage == null || article.profImage == '') {
                var style = {
                    "background-image": "url(/Content/images/default.png)"
                }
                return style; 
            }
           
            var urlNoSpace = article.profImage.split(' ').join('%20');
                var style = {
                    "background-image": "url(" + urlNoSpace + ")",
                }
                return style;
        }

        $scope.chooseCategory = function (category) {
            if (category.Name == "הכל") {
                appServices.GetAllArticles().then(function (data) {
                    console.log(data);
                    if (data.ErrorCode == 0) {
                        var index = $scope.getIndexFromValue(category)
                        if (index != null) {
                            $scope.ArticleCat = $rootScope.categoriesData[index];
                        }
                        $scope.Articles = data.Data;
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
                        $scope.OpenPopup("שגיאה בלתי צפויה!", "נסה להתחבר מחדש, ואם הבעיה איננה נפתרת פנה למנהל האתר");
                    }
                    $scope.categorySelected = category;
                    $scope.select2 = category;

                });


                return;
            }

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