OvadiaApp.controller('lessonComponentCtrl', ['$scope','appServices',
    function ($scope, appServices) {
        var self = this;
        $scope.weekEvents = [];

        self.compare = function compare(a, b) {
            if ((a.From_Hour + a.From_Minutes) * 1 < (b.From_Hour + b.From_Minutes))
                return -1;
            if ((a.From_Hour + a.From_Minutes) * 1 > (b.From_Hour + b.From_Minutes))
                return 1;
            return 0;
        }

        self.init = function () {
            $scope.loader = true;
            appServices.GetWeekEvents().then(function (response) {
                try {
                    $scope.weekEvents = response.data.Data;
                    //sort events by start event
                    $scope.weekEvents.Day_1 = $scope.weekEvents.Day_1.sort(self.compare).slice(0, 2);
                    $scope.weekEvents.Day_2 = $scope.weekEvents.Day_2.sort(self.compare).slice(0, 2);
                    $scope.weekEvents.Day_3 = $scope.weekEvents.Day_3.sort(self.compare).slice(0, 2);
                    $scope.loader = false;
                }
                catch (e) {
                    console.log(e);
                }
       
            });
        }

        self.init();
    }]);

OvadiaApp.directive('lessonComponent', function () {
    return {
        restrict: 'E',
        bindToController: true,
        controller: 'lessonComponentCtrl',
        templateUrl: '/Scripts/OvadiaApp/lesson-component/lesson-component.html'
    }
});