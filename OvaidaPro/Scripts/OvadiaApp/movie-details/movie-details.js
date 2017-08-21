OvadiaApp.controller('movieDetailsCtrl', ['$scope', 'appServices', 'ngDialog', '$timeout', '$interval','$stateParams',
    function ($scope, appServices, ngDialog, $timeout, $interval, $stateParams) {
        var self = this;
        $scope.articleId = null;
        $scope.Article = {};
        $scope.Articles = [];
        var promisse;

        self.init = function () {
            $scope.GetNewActiveArticles();

            var url = location.href.toLowerCase();

            if ($stateParams.articleId != null) {
                $scope.articleId = $stateParams.articleId;
                $scope.GetArticle();
            }

            else if (url.indexOf('articleid') > -1) {
                var split = url.split('articleid=');

                if (split != null && split.length > 0) {
                    $scope.articleId = split[1];
                }
                $scope.GetArticle();
            }
        }

        $scope.goToArticle = function (article) {
            window.location.href = '/movie-details?articleId=' + article.ArticleId;
        }

        $scope.notSameArticle = function (item) {
            if (item.Title == $scope.Article.Title)
                return false;

            return true;
        }


        $scope.getIframeSrc = function (link) {
            return link;
        }

        $scope.DateToClient = function (date) {
            try {
                var temp = new Date(parseInt(date.split('/Date(')[1].split(')/')[0]));
                var nday, nmonth;
                var day = temp.getDate();
                var month = (temp.getMonth() * 1 + 1);
                var year = temp.getFullYear();
                nday = temp.getDate();
                nmonth = (temp.getMonth() * 1 + 1);

                if (day * 1 < 10) {
                    nday = '0' + day;
                }
                if (month * 1 < 10) {
                    nmonth = '0' + month;
                }

                return nday + '.' +nmonth + '.' + year;
            }
            catch (e) {
                return null;
            }
        };

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
                        $scope.Article.DatePublish = $scope.DateToClient($scope.Article.DatePublish);
                        $scope.tags = $scope.Article.CategoriesList;
                        $scope.Article.YoutubeLink1 = $scope.Article.Video1 != null ? "https://www.youtube.com/embed/" + $scope.Article.Video1 : null;
                        $scope.Article.YoutubeLink2 = $scope.Article.Video2 != null ? "https://www.youtube.com/embed/" + $scope.Article.Video2 : null;
                        $scope.Article.YoutubeLink3 = $scope.Article.Video3 != null ? "https://www.youtube.com/embed/" + $scope.Article.Video2 : null;
                    }
                    else {
                        //
                    }
                    $scope.loader = false;
                });
        }

        $scope.GetNewActiveArticles = function () {
            $scope.loader = true;
            appServices.GetNewActiveArticles()
                .then(function (data) {
                    var ErrorCode;
                    try {
                        ErrorCode = data.ErrorCode;
                    }
                    catch (e) {
                        ErrorCode = 1;
                    }
                    if (ErrorCode == 0) {
                        $scope.Articles = data.Data;
                    }
                    else {
                        
                    }
                    $scope.loader = false;
                });
        }

        self.init();
    }]);

OvadiaApp.directive('movieDetails', function () {
    return {
        restrict: 'E',
        bindToController: true,
        controller: 'movieDetailsCtrl',
        templateUrl: '/Scripts/OvadiaApp/movie-details/movie-details.html'
    }
});