OvadiaApp.controller('homeFixedCtrl', ['$scope', 'appServices', 'ngDialog', '$timeout',
    function ($scope, appServices, ngDialog, $timeout) {

        $scope.FormVadlidation = function () {
            if (sendMail != null)
                return sendMail.checkValidity();
            return false;
        }

        $scope.AddEmail = function () {
            if (!$scope.FormVadlidation() || $scope.email_input == null) {
                $scope.email_error = true;
                return;
            }
            var message = {
                Email: $scope.email_input
            }
            appServices.AddEmail(message).then(function (response) {

                if (response.data.ErrorCode == 0) {
                    $scope.successMail = true;
                }
                else if (response.data.ErrorCode == 2) {
                    $scope.email_exist_error = true;
                }
                else {
                    $scope.OpenErrorPopup();
                }
            })
        }

        $scope.OpenErrorPopup = function () {
            currentDialog = ngDialog.open({
                template: 'Scripts/OvadiaApp/Admin/events-dialog/fail-message.html',
                scope: $scope
            });

            $timeout(function () {
                $scope.closePopup();
            }, 800);
        }
    }]);



OvadiaApp.directive('homeFixed', function () {
    return {
        restrict: 'E',
        bindToController: true,
        controller: 'homeFixedCtrl',
        templateUrl: '/Scripts/OvadiaApp/home-fixed/home-fixed.html'
    }
});