OvadiaApp.controller('donationWizardCtrl', ['$scope', '$timeout', '$http', '$rootScope', 'ngDialog',
    '$sce',
    function ($scope, $timeout, $http, $rootScope, ngDialog, $sce) {
        var self = this;
        $scope.currentStep = 1;
        $scope.PassStep = [false, false];
        var url = "https://kesherhk.info/Pay.aspx?id=15&value=22b2629453fb4fa68e57f508552d88e9&pId=2862&dest=1&lang=he-IL";

        self.init = function () {
          
        }

        
        $scope.moveStep = function () {
            if (!WizardForm.checkValidity()) {
                return;
            }

            $scope.PassStep[0] = true;
            $scope.currentStep = 2;
            $scope.Truma.Address = $scope.Truma.Address == null ? "" : $scope.Truma.Address;
            $scope.Truma.Email = $scope.Truma.Email == null ? "" : $scope.Truma.Email;
            $scope.Truma.Comment = $scope.Truma.Comment == null ? "" : $scope.Truma.Comment;


            var param = url + "&titles=hide&cur=" + $scope.cur + "&tz=" + $scope.Truma.NumberId + "&tl=" + $scope.Truma.Phone1
                + "&total=" + $scope.Truma.Total + "&ml=" + $scope.Truma.Email + "&nm=" + $scope.Truma.Payment_FullName
                + "&adrs=" + $scope.Truma.Address + "&cmnt=" + $scope.Truma.Comment; 
            $scope.iframeUrl = $sce.trustAsResourceUrl(param);

        }

        $scope.StartStep = function (step) {
            
            switch (step) {
                case 1:
                    $scope.currentStep = 1;
                    break;
                case 2:
                    $scope.currentStep = 2;
                    break;
             
            }
        }

        self.init();
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