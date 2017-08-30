OvadiaApp.controller('caruselAdminCtrl', ['$scope', 'appServices', 'UserAccount', '$rootScope','$http',
    function ($scope, appServices, UserAccount, $rootScope, $http) {
        var self = this;
        $scope.tags = null;
        $scope.Articles = [];

        self.init = function () {
            $scope.getAllArticles();
        }

        $scope.loadTags = function (query) {
            return $http.get('/CategorySer/AutoCompleteGetCategoriesByName?name=' + query );
        }

        $scope.getAllArticles = function () {
            appServices.GetAllArticles().then(function (data) {
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
                else {
                    $scope.OpenPopup("שגיאה בלתי צפויה!", "נסה להתחבר מחדש, ואם הבעיה איננה נפתרת פנה למנהל האתר");
                }

            });
        }

        $scope.myStyle = function (article) {
            if (article.profImage == null || article.profImage == '') {
                return "background-image:url(/Content/images/default.png)";
            }
            var urlNoSpace = article.profImage.split(' ').join('%20');

            return "background-image: url(" + urlNoSpace + ")";
        }

        $scope.tagsFilter = function (item) {
            debugger;

            if ($scope.tags == null || $scope.tags == "" || $scope.tags.length == 0) {
                return false;
            }
            if (item == null || item.CategoriesList == null || item.CategoriesList == "" ||
                item.CategoriesList.length == 0 )
                return false;
            for (var i = 0; i < item.CategoriesList.length; i++) {
                for (var j = 0; j < $scope.tags.length; j++) {
                    
                    if (item.CategoriesList[i].CategoryId == $scope.tags[j].CategoryId)
                        return true;
                }
            }

            return false;
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