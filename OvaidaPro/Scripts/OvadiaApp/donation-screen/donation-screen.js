OvadiaApp.controller('donationScreenCtrl', ['$scope', '$interval', 'appServices', '$stateParams',
    function ($scope, $interval, appServices, $stateParams) {
        self = this;
        $scope.Trumot = [];
        $scope.Truma = {};
        $scope.loader = false;
        $scope.wizard = false;
        $scope.Type = null;

        self.init = function () {
            $scope.getAllTrumot();

            if ($stateParams.Type != null) {
                $scope.Type = $stateParams.Type;
            }
        }

        $scope.getAllTrumot = function () {
            $scope.loader = true;
            appServices.GetAllTActiveTruma().then(function (data) {
                if (data.ErrorCode == 0) {
                    $scope.Trumot = data.Data;

                    if ($scope.Type != null) {
                        angular.forEach($scope.Trumot, function (value, key) {
                            if (value.Truma_Type == $scope.Type) {
                                $scope.Trom(value);
                            }
                        });
                    }
                }
                else {

                }
                $scope.loader = false;
            });
        }

        $scope.ImageProfile = function (item) {
            if (item.ProfilePic == '' || item.ProfilePic == null) {
                return "/Content/images/no-Image.png";
            }
            else {
                return item.ProfilePic;
            }
        }

        $scope.Trom = function (item) {
            $scope.wizard = true;
            $scope.Truma = item;
        }

        self.init();

    }]);


OvadiaApp.directive('donationScreen', function () {
    return {
        restrict: 'E',
        bindToController: true,
        controller: 'donationScreenCtrl',
        templateUrl: '/Scripts/OvadiaApp/donation-screen/donation-screen.html'
    }
});