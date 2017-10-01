OvadiaApp.controller('donationDetailsCtrl', ['$scope', '$interval', 'appServices', 'ngDialog','$rootScope',
    function ($scope, $interval, appServices, ngDialog, $rootScope) {
        self = this;
        $scope.Tormim = [];
        $scope.loader = false;

        self.init = function () {///
            $scope.getAllDonates();
        }

        $scope.SlideToggleInfo = function (param) {
            $("." +param).slideToggle(300);
        }

        $scope.getAllDonates = function () {
            appServices.GetAllTormim().then(function (data) {
                if (data.ErrorCode == 0) {
                    $scope.Tormim = data.Data;

                    angular.forEach($scope.Tormim, function (value, index) {
                        value.PayDate = $rootScope.FullDateToClient(value.PayDate);
                       
                        if (value.Donates != null) {
                            var donates = value.Donates.split("$$$");
                            value.Donates1 = donates;
                        }
                    });

                }
                else if (data.ErrorCode == 5) {
                    $rootScope.LogOut();
                }
            });
        }

        $scope.SlideToggle = function(param) {
            $(param).slideToggle(400);
        }

        self.init();

    }]);


OvadiaApp.directive('donationDetails', function () {
    return {
        restrict: 'E',
        bindToController: true,
        controller: 'donationDetailsCtrl',
        templateUrl: '/Scripts/OvadiaApp/Admin/donation/donation-details/donation-details.html'
    }
});