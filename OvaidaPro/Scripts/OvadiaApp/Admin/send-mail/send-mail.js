OvadiaApp.controller('sendMailCtrl', ['$scope', 'appServices', 'ngDialog', '$timeout','$rootScope',
    function ($scope, appServices, ngDialog, $timeout, $rootScope) {
        var self = this;
        $scope.radio = 2;
        $scope.Mail = {};
        $scope.Messages = {};
        $scope.Messages.data = [];
        $scope.eventDetailsForm, $scope.sendMessForm;
        $scope.currentMsg = {};

        self.init = function () {
            $scope.loader = true;
            appServices.getAllMembers().then(function (response) {
                if (response.data.ErrorCode == 0) {
                    $scope.Messages.data = response.data.Data;
                }
                else if (response.data.ErrorCode == 5) {
                    $rootScope.LogOut();
                }
                else {
                    $scopeloader = false;
                    $scope.OpenErrorPopup();
                }
                $scope.loader = false;

            });
        }

        $scope.OpenAddMsg = function () {
            currentDialog = ngDialog.open({
                template: 'Scripts/OvadiaApp/Admin/events-dialog/add-message.html',
                scope: $scope
            });
        }

        $scope.OpenSuccessPopup = function () {
            currentDialog = ngDialog.open({
                template: 'Scripts/OvadiaApp/Admin/events-dialog/success-message.html',
                scope: $scope
            });

            $timeout(function () {
                $scope.closePopup();
            }, 1000);
        }

        $scope.OpenSuccessSendMailPopup = function () {
            currentDialog = ngDialog.open({
                template: 'Scripts/OvadiaApp/Admin/events-dialog/mails-send-succ.html',
                scope: $scope
            });

            $timeout(function () {
                $scope.closePopup();
            }, 1000);
        }

        $scope.OpenSureDeletePopup = function (id,email) {
            $scope.email_to_delete = email;
            $scope.email_id = id;
            currentDialog = ngDialog.open({
                template: 'Scripts/OvadiaApp/Admin/events-dialog/are-you-sure.html',
                scope: $scope
            });
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

        $scope.OpenEmailExistErrorPopup = function () {
            currentDialog = ngDialog.open({
                template: '/Scripts/OvadiaApp/Admin/events-dialog/email-exist-error.html',
                scope: $scope
            });

            $timeout(function () {
                $scope.closePopup();
            }, 1000);
        }

        $scope.closePopup = function () {
            ngDialog.close(currentDialog);
            $('.ngdialog-closing').hide(400, function () {
                $(this).remove();
            })
            //$('.ngdialog').remove(200);
        }

        $scope.AddEmail = function () {

            if (!$scope.FormVadlidation() || $scope.currentMsg.Email == null) {
                return;
            }

            $scope.currentMsg.Full_Name = "";

            appServices.AddEmail($scope.currentMsg).then(function (response) {
                if (response.data.ErrorCode == 0) {
                    $scope.currentMsg.ID = response.data.Data.ID;
                    $scope.Messages.data.push($scope.currentMsg);
                    $scope.closePopup();
                    $scope.OpenSuccessPopup();
                }
                else if (response.data.ErrorCode == 2) {
                    $scope.closePopup();
                    $scope.OpenEmailExistErrorPopup();
                }
                else if (response.data.ErrorCode == 5) {
                    $rootScope.LogOut();
                }
                else {
                    $scope.closePopup();
                    $scope.OpenErrorPopup();
                }

                $scope.currentMsg = {};
            });
        }

        $scope.removeEmail = function (id) {
            $scope.closePopup();

            appServices.removeEmail(id).then(function (response) {
                if (response.data.ErrorCode == 0) {
                    var index = $scope.Messages.data.findIndex(function (o) {
                        return o.ID === id;
                    });
                    $scope.Messages.data.splice(index, 1);
                    $scope.OpenSuccessSendMailPopup();
                }
                else if (response.data.ErrorCode == 5) {
                    $rootScope.LogOut();
                }
                else {
                    $scope.OpenErrorPopup();
                }
            });
        }

        $scope.SendMail = function () {
            if (!self.FormSendMsgVadlidation()){
                return;
            }

            $scope.loaderSend = true;
            appServices.sendEmail($scope.Mail).then(function (response) {
                console.log(response);
                if (response.data.ErrorCode == 0) {
                    $scope.loaderSend = false;
                    $scope.OpenSuccessSendMailPopup();
                }
                else if (response.data.ErrorCode == 5) {
                    $rootScope.LogOut();
                }
                else {
                    $scope.loaderSend = false;
                    $scope.OpenErrorPopup();
                }
            });
        }

        self.FormSendMsgVadlidation = function () {
            if (sendMessForm != null)
                return sendMessForm.checkValidity();
            return false;
        }

        $scope.FormVadlidation = function () {
            if (eventDetailsForm != null)
                return eventDetailsForm.checkValidity();
            return false;
        }

        self.init();
    }]);


OvadiaApp.directive('sendMail', function () {
    return {
        restrict: 'E',
        bindToController: true,
        controller: 'sendMailCtrl',
        templateUrl: '/Scripts/OvadiaApp/Admin/send-mail/send-mail.html'
    }
});