OvadiaApp.controller('donationHomeCtrl', ['$scope', '$interval', 'appServices','ngDialog',
    function ($scope, $interval, appServices, ngDialog) {
        self = this;
        $scope.Truma = {};
        $scope.Trumot = [];
        $scope.trumot = [
            { id: 1, Name: 'ברכת השנה' }, 
            { id: 2, Name: 'הוראות קבע' },
            { id: 3, Name: 'הקדשת ארוחת צהריים לאברכים' },
            { id: 4, Name: 'הקדשת שיעור לברכה' },
            { id: 5, Name: 'הקדשת שיעור לעילוי נשמת \\ הצלחה' },
            { id: 6, Name: 'מחצית השקל' },
            { id: 7, Name: 'פדיון כפרות' },
            { id: 8, Name: 'פרנס היום' },
            { id: 9, Name: 'צדקה לפני סוכות' },
            { id: 10, Name: 'קמחא דפסחא' }
        ];
        $scope.loader = false;

        self.init = function () {///
            $scope.getAllTrumaTypes();
        }

        $scope.getAllTrumaTypes = function () {
            $scope.loader = true;
            appServices.GetAllTTruma().then(function (data) {
                if (data.ErrorCode == 0) {
                    $scope.Trumot = data.Data;
                }
                else {
                    $scope.OpenPopup("שגיאה בלתי צפויה!", "נסה להתחבר מחדש, ואם הבעיה איננה נפתרת פנה למנהל האתר");
                }

                $scope.loader = false;
            });
        }

        $scope.selectTruma = function () {
            $scope.Truma = $scope.truma_select;
        }

        $scope.SaveTruma = function () {
            appServices.SaveTruma($scope.Truma).then(function (data) {
                if (data.ErrorCode == 0) {
                    var index = $scope.Trumot.findIndex(item => item.Id === data.Data.Id);
                    $scope.Trumot[index] = data.Data;
                    $scope.OpenPopup("תרומה נשמרה בהצלחה!", "פרטי התרומה נשמרו בהצלחה!");
                }
                else {
                    $scope.OpenPopup("שגיאה בלתי צפויה!", "נסה להתחבר מחדש, ואם הבעיה איננה נפתרת פנה למנהל האתר");
                }
            });
        }

        $scope.OpenPopup = function (title, msg) {
            $scope.Title = title;
            $scope.Msg = msg;
            ngDialog.open({
                template: '/Scripts/OvadiaApp/Admin/events-dialog/Movies/Movie-change.html',
                scope: $scope
            });
        }

        self.init();

    }]);


OvadiaApp.directive('donationHome', function () {
    return {
        restrict: 'E',
        bindToController: true,
        controller: 'donationHomeCtrl',
        templateUrl: '/Scripts/OvadiaApp/Admin/donation/donation-home/donation-home.html'
    }
});