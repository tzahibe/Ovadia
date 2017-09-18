OvadiaApp.controller('donationWizardCtrl', ['$scope', '$timeout', '$http', '$rootScope', 'ngDialog',
    '$sce','appServices',
    function ($scope, $timeout, $http, $rootScope, ngDialog, $sce, appServices) {
        var self = this;
        var inputIndex = 1;
        $scope.currentStep = 1;
        $scope.fixedTotal = false;
        $scope.TrumaPerson = {};
        $scope.PassStep = [false, false];
        $scope.items = [{ model_father: '', model_son: '', id: "input_1", model_gender:'0'}];

        var url = "https://kesherhk.info/Pay.aspx?id=15&value=22b2629453fb4fa68e57f508552d88e9&pId=2862&dest=1&lang=he-IL";

        self.init = function () {
            if ($scope.Truma.Total > 0) {
                $scope.TrumaPerson.Total = $scope.Truma.Total;
                $scope.TrumaPerson.Type = $scope.Truma.Truma_Type;
                $scope.fixedTotal = true;
            }
        }

        
        $scope.moveStep = function () {
            if (!WizardForm.checkValidity()) {
                return;
            }

            $scope.TrumaPerson.Donates = "";
            $scope.TrumaPerson.Address = $scope.TrumaPerson.Address == null ? "" : $scope.TrumaPerson.Address;
            $scope.TrumaPerson.Email = $scope.TrumaPerson.Email == null ? "" : $scope.TrumaPerson.Email;
            $scope.TrumaPerson.Comment = $scope.TrumaPerson.Comment == null ? "" : $scope.TrumaPerson.Comment;


            var param = url + "&titles=hide&cur=" + 1 + "&tz=" + $scope.TrumaPerson.NumberId + "&tl=" + $scope.TrumaPerson.Phone1
                + "&total=" + $scope.TrumaPerson.Total + "&ml=" + $scope.TrumaPerson.Email + "&nm=" + $scope.TrumaPerson.Payment_FullName
                + "&adrs=" + $scope.TrumaPerson.Address + "&cmnt=" + $scope.TrumaPerson.Comment; 

            angular.forEach($scope.items, function (value, key) {
                $scope.TrumaPerson.Donates += value.model_son + " " + $scope.getNameByType(value.model_gender) +
                    " " + value.model_father + "$$$";
            });
            debugger;

            appServices.SavePersonTruma($scope.TrumaPerson).then(function (data) {
                if (data.ErrorCode == 0) {
                    $scope.PassStep[0] = true;
                    $scope.currentStep = 2;
                }
                else {
                    console.log(data.ErrorMsg);
                }
            });

            $scope.iframeUrl = $sce.trustAsResourceUrl(param);

        }

        $scope.getNameByType = function (type) {
            if (type == 0) {
                return "בן";
            }
            else {
                return "בת";
            }
        }

        $scope.StartStep = function (step) {
            
            switch (step) {
                case 1:
                    $scope.currentStep = 1;
                    break;
                case 2:
                    if ($scope.PassStep[0]) {
                        $scope.currentStep = 2;
                    }
                    break;
             
            }
        }

        $scope.addInput = function () {
            var item = {
                model_father: '', model_son: '', id: "input_" + inputIndex, model_gender: '0'
            }

            $scope.items.push(item);
            inputIndex++;
        }

        $scope.removeInput = function (item) {
            var index = $scope.items.findIndex(function (o) {
                return o.id === item.id;
            });

            $scope.items.splice(index, 1);
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