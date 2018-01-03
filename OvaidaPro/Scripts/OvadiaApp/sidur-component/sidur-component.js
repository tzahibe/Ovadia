OvadiaApp.controller('sidurComponentCtrl', ['$scope', 'appServices', 'UserAccount', '$rootScope', '$interval','ngDialog',
    function ($scope, appServices, UserAccount, $rootScope, $interval, ngDialog) {
        var self = this;
        $scope.Categories = [];
        $scope.node = {};
        $scope.node.Id = -1;
        $scope.breadcamp = [];

        self.init = function () {
            $scope.getAllCategories();
        }

        $scope.OpenPopup = function (title, msg) {
            $scope.Title = title;
            $scope.Msg = msg;
            ngDialog.open({
                template: '/Scripts/OvadiaApp/Admin/events-dialog/popup-screen.html',
                className: 'ngdialog-theme-default',
                scope: $scope
            });
        }

        $scope.getAllCategories = function () {
            $scope.loader = true;
            appServices.Siduer_GetAll().then(function (data) {
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

        $scope.getOutToCategory = function (item) {
            if (item.isCategory == 0) {
                return;
            }
            if (item.Parent == 0) {
                $scope.breadcamp = [];
                $scope.breadcamp.push(item);
                $scope.node = item;
                $scope.Tfila = {};
                return;
            }
            $scope.Tfila = {};
            $scope.breadcamp.splice(-1, 1)
            $scope.node = item;
        }
       
        $scope.getTfilaOrSubCat = function (item) {
            if ($scope.node.Id == -1) {
                $scope.breadcamp = [];
                $scope.Tfila = {};
            }

            if (item.isCategory == 0) { 
                $scope.Tfila = item;
            }

            $scope.breadcamp.push(item);
            $scope.node = item;
        }

        $scope.filterCategory = function (item) {
            if ($scope.node.Id == item.Parent) {
                return true;
            }
            if ($scope.node.Id == -1 && item.isCategory == 1 && item.Parent == 0) {
                return true;
            }

            return false;
        }

        $scope.getItemFromCategories = function(id){
            for (var i = 0; i < $scope.Categories.length; i++) {
                if ($scope.Categories[i].Id == id) {
                    return $scope.Categories[i];
                }
            }

            return null;
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

