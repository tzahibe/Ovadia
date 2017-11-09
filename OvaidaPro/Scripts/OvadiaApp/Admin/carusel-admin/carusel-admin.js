OvadiaApp.controller('caruselAdminCtrl', ['$scope', 'appServices', 'UserAccount', '$rootScope', '$http','ngDialog',
    function ($scope, appServices, UserAccount, $rootScope, $http, ngDialog ) {
        var self = this;
        $scope.tags = null;
        $scope.Articles = [];

        self.init = function () {
            $scope.getAllArticles();
            $scope.initSavedResult();

        }

        $scope.loadTags = function (query) {
            return $http.get('/CategorySer/AutoCompleteGetCategoriesByName?name=' + query );
        }

        $scope.getAllArticles = function () {
            appServices.GetAllActiveArticles().then(function (data) {
                if (data.ErrorCode == 0) {
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
                else if (data.ErrorCode == 5) {
                    $rootScope.LogOut();
                }
                else {
                    $scope.OpenPopup("שגיאה בלתי צפויה!", "נסה להתחבר מחדש, ואם הבעיה איננה נפתרת פנה למנהל האתר");
                }

            });
        }

        $scope.toShow = function () {
            if ($scope.FilteredData != null && $scope.FilteredData.length > 0 != null ||
                $scope.datSaved != null && $scope.datSaved.length > 0 != null) {
                return true;
            }
            return false;
        }

        $scope.myStyle = function (article) {
            if (article.Video1 != null && article.Video1 != '') {
                return "background-image:url('https://i.ytimg.com/vi_webp/" + article.Video1 + "/sddefault.webp');BACKGROUND-SIZE: 100% 130%;background-position: 121% -20px;";
            }

            if (article.ProfilePic == '' || article.ProfilePic == null) {
                return "background-image:url('/Content/images/no-image-details.png') BACKGROUND-SIZE: 100% 130%;background-position: 121% -20px;";
            }
            else {
                return "background - image:url0('" + article.ProfilePic + "';BACKGROUND-SIZE: 100% 130%;background-position: 121% -20px;";
            }
        }

        $scope.tagsFilter = function (item) {

            if (item.Video1 == $scope.Video1 && item.Video1 != null || item.Video1 == $scope.Video2 && item.Video1 != null
                || item.Video2 == $scope.Video1 && item.Video2 != null || item.Video2 == $scope.Video2 && item.Video2 != null
            ) {
                return true;

            }

            if ($scope.tags == null || $scope.tags == "" || $scope.tags.length == 0) {
                return false;
            }

            if (item == null || item.CategoriesList == null || item.CategoriesList == "" ||
                item.CategoriesList.length == 0)
                return false;

             if (item.CategoriesList != null && item.CategoriesList.length > 0 && $scope.tags != null &&
                $scope.tags.length > 0) {
                for (var i = 0; i < item.CategoriesList.length; i++) {
                    for (var j = 0; j < $scope.tags.length; j++) {
                        if (item.CategoriesList[i].CategoryId == $scope.tags[j].CategoryId)
                            return true;
                    }
                }
            }
            //if (item.CategoriesList != null && item.CategoriesList.length > 0 && $scope.tags != null &&
            //    $scope.tags.length == 1) {
            //    for (var i = 0; i < item.CategoriesList.length; i++) {
            //        for (var j = 0; j < $scope.tags.length; j++) {
            //            if (item.CategoriesList[i].CategoryId == $scope.tags[j].CategoryId)
            //                return true;
            //        }
            //    }
            //}
            
            //if (item.CategoriesList != null && item.CategoriesList.length > 1 && $scope.tags != null &&
            //    $scope.tags.length > 1) {
            //    var result = item.CategoriesList.filter(function (fs) {
            //        return $scope.tags.some(function (ff) { return fs.CategoryId == ff.CategoryId });
            //    });

            //    if (result.length == $scope.tags.length) {
            //        return true;
            //    }
            //}
           
        }

        $scope.saveCarusel = function () {
            appServices.SaveCaruselArticles($scope.FilteredData).then(function (data) {
                if (data.ErrorCode == 0) {
                    $scope.OpenPopup("הודעת מערכת","הנתונים נשמרו בהצלחה!");
                }
                else {
                    $scope.OpenPopup("שגיאה", "תקלה בשמירת הנתונים");
                }
            })
        }

        $scope.OpenPopup = function (title, msg) {
            $scope.Title = title;
            $scope.Msg = msg;
            ngDialog.open({
                template: '/Scripts/OvadiaApp/Admin/events-dialog/Movies/Movie-change.html',
                className: 'ngdialog-theme-default',
                scope: $scope
            });
        }

        $scope.initSavedResult = function (){ 
           
            appServices.GetCaruselArticles().then(function (data) {

                if (data.ErrorCode == 0) {
                    $scope.datSaved = data.Data;

                    angular.forEach($scope.datSaved, function (value, key) {
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
                else if (data.ErrorCode == 5) {
                    $rootScope.LogOut();
                }
                else {
                }
            })
        }

        $scope.cleanData = function () {
            $scope.datSaved = null;
        }

        self.init();

    }]);

OvadiaApp.directive('caruselAdmin', function () {
    return {
        restrict: 'E',
        bindToController: true,
        controller: 'caruselAdminCtrl',
        templateUrl: '/Scripts/OvadiaApp/Admin/carusel-admin/carusel-admin.html'
    }
});