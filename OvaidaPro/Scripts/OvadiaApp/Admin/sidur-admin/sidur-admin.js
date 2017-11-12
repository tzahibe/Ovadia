OvadiaApp.controller('sidurAdmintCtrl', ['$scope', 'appServices', 'UserAccount', '$rootScope', '$interval','ngDialog',
    function ($scope, appServices, UserAccount, $rootScope, $interval, ngDialog) {
        var self = this;
        $scope.radio = 2;
        $scope.Categories = [];
        $scope.category = {};

        self.init = function () {
            $scope.getAllSidurCategory();
            $scope.GetAllSidurTfilot();
        }

        $scope.NewCateogry = function () {
            $scope.loader = true;
            $scope.category.isCategory = 1;
            appServices.AddSidurCategory($scope.category).then(function (data) {
                if (data.ErrorCode == 0) {
                    var id = $scope.category.Id;
                    $scope.category = data.Data;
                    $scope.getAllSidurCategory();
                    if (id == null) {
                        $scope.OpenPopup("קטגוריה נוצרה בהצלחה!", "תוכל להמשיך לערוך את הקטגוריה");
                    }
                    else {
                        $scope.OpenPopup("קטגוריה עודכנה בהצלחה!", "תוכל להמשיך לערוך את הקטגוריה");
                    }
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

        $scope.NewTfila = function () {
            $scope.loader = true;
            $scope.category.isCategory = 0;
            appServices.AddSidurCategory($scope.category2).then(function (data) {
                if (data.ErrorCode == 0) {
                    var id = $scope.category2.Id;
                    $scope.category2 = data.Data;
                    $scope.getAllSidurCategory();
                    if (id == null) {
                        $scope.OpenPopup("תפילה נוצרה בהצלחה!", "תוכל להמשיך לערוך את התפילה");
                    }
                    else {
                        $scope.OpenPopup("תפילה עודכנה בהצלחה!", "תוכל להמשיך לערוך את התפילה");
                    }
                  
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

        $scope.getAllSidurCategory = function () {
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

        $scope.GetAllSidurTfilot = function () {
            $scope.loader = true;
            appServices.GetAllSidurTfilot().then(function (data) {
                if (data.ErrorCode == 0) {
                    $scope.tfilaCategories = data.Data;
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

        $scope.chooseCategory = function (category) {
            if (category != null && category.Title != null) {
                $scope.category.Parent = category.Id;
            }
        }

        $scope.chooseCategory2 = function (category) {
            if (category != null && category.Title != null) {
                $scope.category2.Parent = category.Id;
            }
        }

        $scope.restTfila = function () {
            $scope.category2 = {};
            $scope.category2.isCategory = 0;
        }

        $scope.resetCategory = function () {
            $scope.category = {};
            $scope.category.isCategory = 1;
        }

        $scope.editTfilaSelect2 = function (tfila) {
            if (tfila != null && tfila.Title != null) {
                $scope.category2 = tfila;
            }
        }

        $scope.editCateogryselect2 = function (category) {
            if (category != null && category.Title != null ) {
                $scope.category = category;
            }
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

        $scope.notEqualChoosen = function (item) {
           
            if (item.Title == $scope.category.Title ) {
                return false
            }
            return true;
        }

        self.init();

    }]);

OvadiaApp.directive('sidurAdmin', function () {
    return {
        restrict: 'E',
        bindToController: true,
        controller: 'sidurAdmintCtrl',
        templateUrl: '/Scripts/OvadiaApp/Admin/sidur-admin/sidur-admin.html'
    }
});

