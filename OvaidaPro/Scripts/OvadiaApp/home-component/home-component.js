OvadiaApp.controller('homeComponentCtrl', ['$scope', 'appServices','ngDialog','$timeout',
    function ($scope, appServices, ngDialog, $timeout) {
        var self = this;
        //$scope.Tfilot = [];

        self.init = function () {
            //$scope.tfilot_loader = true;
            //appServices.getAllTfilot().then(function (response) {
            //    if (response.data.ErrorCode == 0) {
            //        $scope.tfilot_loader = false;
            //        $scope.Tfilot = response.data.Data;
            //    }
            //    else {
            //        $scope.tfilot_loader = false;
            //        $scope.errorTfilot = true;
            //    }
            //});
        }

        $scope.successMail = false;

        $scope.OpenSuccessPopup = function () {
            currentDialog = ngDialog.open({
                template: 'Scripts/OvadiaApp/Admin/events-dialog/success-message.html',
                scope: $scope
            });

            $timeout(function () {
                $scope.closePopup();
            }, 800);
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

        $scope.closePopup = function () {
            ngDialog.close(currentDialog);
            $('.ngdialog-closing').hide(400, function () {
                $(this).remove();
            })
            //$('.ngdialog').remove(200);
        }

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

        self.init();
    }]);

OvadiaApp.directive('homeComponent', function () {
    return {
        restrict: 'E',
        bindToController: true,
        controller: 'homeComponentCtrl',
        templateUrl:'/Scripts/OvadiaApp/home-component/home-component.html'
    }
});