OvadiaApp.controller('carouselComponentCtrl', ['$scope','$interval',
    function ($scope, $interval)
    {
        self = this;
        var _setIntervalHandler;
        $scope.randNumber;
        $scope.images = [true, false, false, false];
        $scope.imageText = ['סיכום פרשת אמור- מפי הרב אליהו נגר', 'text2', 'text3', 'text4'];
        $scope.imageUrl = ['#', '#', '#', '#'];

        self.RandomImage = function() {
            if ($scope.randNumber == null) {
                $scope.randNumber = Math.floor((Math.random() * 4));
            }
            else {
                $scope.randNumber++;
                $scope.randNumber = $scope.randNumber  % 3;
            }
            $scope.images = [false];

            $scope.images[$scope.randNumber] = true;
        }

        $scope.circleClicked = function(index) {
            switch (index) {
                case 0:
                    $scope.images[0] = true;
                    $scope.images[1] = false;
                    $scope.images[2] = false;
                    $scope.images[3] = false;
                    break;
                case 1:
                    $scope.images[0] = false;
                    $scope.images[1] = true;
                    $scope.images[2] = false;
                    $scope.images[3] = false;
                    break;
                case 2:
                    $scope.images[0] = false;
                    $scope.images[1] = false;
                    $scope.images[2] = true;
                    $scope.images[3] = false;
                    break;
                case 3:
                    $scope.images[0] = false;
                    $scope.images[1] = false;
                    $scope.images[2] = false;
                    $scope.images[3] = true;
                    break;
            }
        }

        $scope.moveSlide = function(position) {

            if ($scope.randNumber == null) {
                $scope.randNumber = 0;
                $scope.images = [false];
                $scope.images[$scope.randNumber] = true;
                return;
            }
            if (position == "right") {
                if ($scope.randNumber == 0) {
                    $scope.randNumber = 3;
                }
                else {
                    $scope.randNumber--;
                }
            }
            else {
                if ($scope.randNumber  == 3) {
                    $scope.randNumber = 0;
                }
                else {
                    $scope.randNumber++;
                }
            }

            $scope.images = [false];
            $scope.images[$scope.randNumber] = true;

        }

        self.init = function() {///
            this._setIntervalHandler = $interval(() => {
                if (self.RandomImage != null)
                    self.RandomImage();
            }, 6000);
        }

        self.init();

}]);


OvadiaApp.directive('carouselComponent', function () {
    return {
        restrict: 'E',
        bindToController: true,
        controller: 'carouselComponentCtrl',
        templateUrl:'/Scripts/OvadiaApp/carousel-component/carousel-component.html'
    }
});