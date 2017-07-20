OvadiaApp.controller('editMoviesCtrl', ['$scope', 'appServices', 'ngDialog', '$timeout','$state',
    function ($scope, appServices, ngDialog, $timeout, $state) {
        var self = this;
        $scope.Articles = [];
        $scope.Article = {};

        self.init = function () {
            $scope.getAllActiveCategories();
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

        $scope.getIframeSrc = function (link) {
            return link;
        }

        $scope.goToArticle = function (Id) {
            $state.go("admin.add-movie", { articleId: Id});
        }

        $scope.myStyle = function (article) {
            var style = {
                "background-image": "url(" + article.ProfilePic + ")",
            }

            return style;
        }

        $scope.chooseCategory = function (item) {
            appServices.GetArticlesByCategoryId(item.Id).then(function (data) {
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