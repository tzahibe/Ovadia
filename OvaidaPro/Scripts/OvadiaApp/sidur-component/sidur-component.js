OvadiaApp.controller('sidurComponentCtrl', ['$scope', 'appServices', 'UserAccount', '$rootScope', '$interval',
    function ($scope, appServices, UserAccount, $rootScope, $interval) {
        var self = this;
        $scope.Categories = [];

        self.init = function () {
            $scope.getAllCategories();
        }

        $scope.getAllCategories = function () {
            $scope.loader = true;
            appServices.GetAllSidurCateogires().then(function (data) {
                if (data.ErrorCode == 0) {
                    $scope.Categories = data.Data;
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

OvadiaApp.directive('sidurComponent', function () {
    return {
        restrict: 'E',
        bindToController: true,
        controller: 'sidurComponentCtrl',
        templateUrl: '/Scripts/OvadiaApp/sidur-component/sidur-component.html'
    }
});

