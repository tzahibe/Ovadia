OvadiaApp.controller('movieCategoryCtrl', ['$scope', 'appServices', 'ngDialog', '$timeout', '$interval',
    '$rootScope',
    function ($scope, appServices, ngDialog, $timeout, $interval, $rootScope) {
        var self = this;
        $scope.showSubSub = false, $scope.showSub = false;
        var promisse;

        self.init = function () {
            $scope.getAllCategories();
            $scope.GetAllCategoires_rabi();
        }

        $scope.getAllCategories = function () {
            $scope.loader = true;
            appServices.GetAllActiveCategoriesAcceptId(15).then(function (data) {
                if (data.ErrorCode == 0) {
                    $rootScope.categoriesData = data.Data;
                }
                else {

                }

                $scope.loader = false;

            });
        }

        $scope.GetAllCategoires_rabi = function () {
            $scope.loader = true;
            appServices.GetAllChildrensCategoriesById(15).then(function (data) {
                if (data.ErrorCode == 0) {
                    $rootScope.categoriesRabiData = data.Data;
                }
                else {
                }

                $scope.loader = false;

            });
        }

        $scope.ChangeCategory = function (item) {
            $scope.loader = true;
            appServices.GetAllChildrensCategoriesById(item.id).then(function (data) {
                if (data.ErrorCode == 0) {
                    $rootScope.categoriesSubData = data.Data;
                    if ($rootScope.categoriesSubData.length > 0) {
                        $scope.showSub = true;
                    }
                    else {
                        $scope.showSub = false;
                    }
                }
                else {
                }

                $scope.loader = false;

            });
        }

        $scope.ChangeSubCategory = function (item) {
            debugger;
            $scope.loader = true;
            appServices.GetAllChildrensCategoriesById(item.Id).then(function (data) {
                if (data.ErrorCode == 0) {
                    $rootScope.categoriesSubSubData = data.Data

                    if ($rootScope.categoriesSubSubData.length > 0) {
                        $scope.showSubSub = true;
                    }
                    else {
                        $scope.showSubSub = false;
                    }
                }
                else {
                }

                $scope.loader = false;

            });
        }

        self.init();
    }]);

OvadiaApp.directive('movieCategory', function () {
    return {
        restrict: 'E',
        bindToController: true,
        controller: 'movieCategoryCtrl',
        templateUrl: '/Scripts/OvadiaApp/movie-category/movie-category.html'
    }
});