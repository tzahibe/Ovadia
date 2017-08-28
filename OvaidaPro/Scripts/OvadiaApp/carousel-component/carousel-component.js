OvadiaApp.controller('carouselComponentCtrl', ['$scope', '$interval','appServices',
    function ($scope, $interval, appServices) {
        self = this;
        $scope.Articles = [];

        self.init = function () {///
            $scope.GetNewActiveArticles();
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

                        angular.forEach($scope.Articles, function (value, key) {
                            value.YoutubeLink1 = "https://www.youtube.com/embed/" + value.Video1;
                            value.YoutubeLink2 = "https://www.youtube.com/embed/" + value.Video1;
                            value.YoutubeLink3 = "https://www.youtube.com/embed/" + value.Video1;
                            //value.ProfilePic = $scope.defaultProfilePic(value);
                        });
                        self.initCarusel();

                    }
                    else {

                    }
                    $scope.loader = false;
                });
        }


        self.initCarusel = function () {
            var videos = [];

            for (var i = 0; i < $scope.Articles.length; i++) {
                var data = {
                    title: $scope.Articles[i].Title,
                    type: 'text/html',
                    youtube: $scope.Articles[i].Video1
                }
                videos.push(data);
            }
            
           
            
            // Initialize the Gallery as video carousel:
            blueimp.Gallery(
                videos, {
                    container: '#blueimp-video-carousel',
                    carousel: true
                });

        }

        self.init();

    }]);


OvadiaApp.directive('carouselComponent', function () {
    return {
        restrict: 'E',
        bindToController: true,
        controller: 'carouselComponentCtrl',
        templateUrl: '/Scripts/OvadiaApp/carousel-component/carousel-component.html'
    }
});