OvadiaApp.controller('donationWizardCtrl', ['$scope','$timeout', '$http', '$rootScope', 'ngDialog',
    function ($scope, $timeout, $http, $rootScope, ngDialog) {

    }
]);

OvadiaApp.directive('donationWizard', function () {
    return {
        restrict: 'E',
        bindToController: true,
        controller: 'donationWizardCtrl',
        templateUrl: '/Scripts/OvadiaApp/donation-screen/donation-wizard/donation-wizard.html'
    }
});