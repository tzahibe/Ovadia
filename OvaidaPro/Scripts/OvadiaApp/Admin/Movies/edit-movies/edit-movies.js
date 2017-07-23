OvadiaApp.controller('editMoviesCtrl', ['$scope', 'appServices', 'ngDialog', '$timeout', '$state', '$stateParams',
    '$state',
    function ($scope, appServices, ngDialog, $timeout, $state, $stateParams, $state) {
        var self = this;
        $scope.Articles = [];
        $scope.catNames = [];
        $scope.Article = {};
        $scope.ArticleCat = null;

        self.init = function () {
            $scope.getAllActiveCategories();

            if ($stateParams.category!= null) {
                $scope.categorySelected = $stateParams.category;
                $scope.chooseCategory($scope.categorySelected); 
            }
        }

        $scope.getIndexFromValue = function (catName) {
            for (var i = 0; i < $scope.catNames; i++) {
                if (scope.catNames[i] === catName)
                    return i;
            }
        }

        $scope.getAllActiveCategories = function () {
            $scope.loader = true;
            appServices.GetAllActiveCategories().then(function (data) {
                if (data.ErrorCode == 0) {
                    $scope.categoriesData = data.Data;
                    angular.forEach($scope.categoriesData, function (value, key) {
                        $scope.catNames.push(value.Name);
                    });
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

        $scope.chooseCategory = function (categoryName) {
            var category = categoryName;
            if ($scope.categoriesData != null) {
                  category = $.grep($scope.categoriesData, function (e) { return e.Name == categoryName; });
                if (category == null)
                    return;
                else {
                    category = category[0];
                }
            }
            
            appServices.GetArticlesByCategoryId(category.Id).then(function (data) {
                if (data.ErrorCode == 0) {
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