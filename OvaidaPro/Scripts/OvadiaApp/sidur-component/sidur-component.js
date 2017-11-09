OvadiaApp.controller('sidurComponentCtrl', ['$scope', 'appServices', 'UserAccount', '$rootScope', '$interval',
    function ($scope, appServices, UserAccount, $rootScope, $interval) {
        var self = this;

        self.init = function () {

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

