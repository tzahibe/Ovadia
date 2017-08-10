OvadiaApp.controller('addMovieCtrl', ['$scope',
    '$timeout', '$http', '$rootScope', 'ngDialog', 'appServices', '$stateParams','$state',
    function ($scope, $timeout, $http, $rootScope, ngDialog, appServices, $stateParams, $state) {
        var self = this;
        $scope.isNewArticle = true;
        $scope.ArticleCat = null;
        $scope.tags = null;

        self.init = function () {
            $scope.getAllCategories();

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

        $scope.removeDuplicate = function (arr) {
            var newArr = [];

            for (i = 0; i < arr.length; i++) {
                var isExist = newArr.filter(function (obj) {
                    return obj.CategoryId == arr[i].CategoryId;
                });

                if (isExist.length == 0) {
                    newArr.push(arr[i]);
                }
            }
            return newArr;
        }

        $scope.backToCategory = function () {
            $state.go("admin.edit-movies", { category: $scope.category });
        }

        $scope.SelectChange = function (item) {
            $scope.Article.CategoryName = item.Name;
            $scope.Article.CategoryId = item.Id;
        }

        $scope.getIframeSrc = function (link) {
            return link;
        }

        $scope.AddArticle = function () {
            $scope.Article.CategoriesList = [];
            if (!movieForm.checkValidity() || $scope.tags == null) {
                $scope.OpenPopup("שדות חובה לא מולאו!", "אנא מלא את השדות המסומנות באדום בערכים מתאימים");
                return;
            }

            angular.forEach($scope.tags, function (value, key) {
                $scope.Article.CategoriesList.push({
                    ArticleId: 0,
                    CategoryId: value.CategoryId,
                    text: value.text
                });
            });
            
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
                else if (ErrorCode == 2) {
                    $scope.OpenPopup("שגיאה!","מאמר עם כותרת זהה כבר קיים במערכת.");

                }
                else if (data.ErrorCode == 5) {
                    $rootScope.LogOut();
                }
                else {
                    $scope.OpenPopup("שגיאה בלתי צפויה!", "נסה להתחבר מחדש, ואם הבעיה איננה נפתרת פנה למנהל האתר");
                }
                $scope.loader = false;
            });
        }

        $scope.getIndexFromValue = function (obj) {
            if ($rootScope.categoriesData == null)
                return;

            for (var i = 0; i < $rootScope.categoriesData.length; i++) {
                if ($rootScope.categoriesData[i].Id == obj.CategoryId)
                    return i;
            }
        }

        $scope.GetArticle = function () {
            debugger;
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
                    $scope.tags = $scope.Article.CategoriesList;
                    $scope.Article.YoutubeLink1 = $scope.Article.Video1 != null ? "https://www.youtube.com/embed/" + $scope.Article.Video1 : null;
                    $scope.Article.YoutubeLink2 = $scope.Article.Video2 != null ? "https://www.youtube.com/embed/" + $scope.Article.Video2 : null;
                    $scope.Article.YoutubeLink3 = $scope.Article.Video3 != null ? "https://www.youtube.com/embed/" + $scope.Article.Video2 : null;
                    var index = $scope.getIndexFromValue($scope.Article);

                    if (index != null) {
                        $scope.select2 = $rootScope.categoriesData[index];
                    }
                    $scope.isNewArticle = false;
                }
                else {
                    $scope.OpenPopup("שגיאה בלתי צפויה!", "נסה להתחבר מחדש, ואם הבעיה איננה נפתרת פנה למנהל האתר");
                }
                $scope.loader = false;
            });
        }

        $scope.EditArticle = function () {
            if (!movieForm.checkValidity() || $scope.tags == null) {
                $scope.OpenPopup("שדות חובה לא מולאו!", "אנא מלא את השדות המסומנות באדום בערכים מתאימים");
                return;
            }
           
            $scope.Article.CategoriesList = [];
            $scope.tags = $scope.removeDuplicate($scope.tags);

            angular.forEach($scope.tags, function (value, key) {
                $scope.Article.CategoriesList.push({
                    ArticleId: $scope.Article.ArticleId,
                    CategoryId: value.CategoryId,
                    text: value.text
                });
            });

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
                    //$scope.Article = response.data.Data;
                    $scope.isNewArticle = false;
                }
                else if (data.ErrorCode == 5) {
                    $rootScope.LogOut();
                }
                else {
                    $scope.OpenPopup("שגיאה בלתי צפויה!", "נסה להתחבר מחדש, ואם הבעיה איננה נפתרת פנה למנהל האתר");
                }
                $scope.loader = false;
            });
        }

        $scope.NewArticle = function () {
            $scope.isNewArticle = true;
            $scope.tags = null;
            $scope.articleId = null;
            $scope.Article = {};
            $scope.ArticleCat = "";
        }

        $scope.loadTags = function (query) {
            return $http.get('/CategorySer/AutoCompleteGetCategoriesByName?name=' + query + "&id=" + $scope.Article.ArticleId);
        }

        $scope.RemoveArticleById = function () {
            //if (!movieForm.checkValidity() || $scope.tags == null) {
            //    $scope.OpenPopup("שדות חובה לא מולאו!", "אנא מלא את השדות המסומנות באדום בערכים מתאימים");
            //    return;
            //}
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
                    else if (data.ErrorCode == 5) {
                        $rootScope.LogOut();
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
                template: '/Scripts/OvadiaApp/Admin/events-dialog/Movies/Movie-change.html',
                //className: 'ngdialog-theme-default',
                scope: $scope
            });
        }
      
        $scope.checkthis = function () {
            debugger;
        }

        $scope.getAllCategories = function () {
            $scope.loader = true;
            if ($rootScope.categoriesData != null && $rootScope.categoriesData.length > 0 )
                return;

            appServices.GetAllCategories().then(function (data) {
                if (data.ErrorCode == 0) {
                    $rootScope.categoriesData = data.Data;
                    $rootScope.categoriesData.unshift({ Name: "הכל" });
                    $.grep($rootScope.categoriesData, function (el, idx) { return el.field == "הכל" }, true)
                }
                else if (data.ErrorCode == 5) {
                    $rootScope.LogOut();
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