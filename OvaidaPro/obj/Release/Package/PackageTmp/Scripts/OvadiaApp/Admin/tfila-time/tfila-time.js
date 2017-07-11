OvadiaApp.controller('tfilaTimeCtrl', ['$scope', 'appServices', 'ngDialog', '$timeout',
    function ($scope, appServices, ngDialog, $timeout) {
        var self = this;
        $scope.Tfilot = {};
        $scope.minutes = $.map($(Array(60)), function (val, i) {
            if (i < 9) {
                return { value: "0" + (i), id: i };
            }
            else {
                return { value: i, id: i };
            }
        });
        $scope.hours = $.map($(Array(25)), function (val, i) {
            if (i < 9) {
                return { value: "0" + (i), id: i };
            }
            else {
                return { value: i, id: i };
            }
        });
        $scope.currentTfila = {};

        self.init = function () {
            $scope.loader1 = true;
            appServices.getAllTfilot().then(function (response) {
                if (response.data.ErrorCode == 0) {
                    console.log(response);
                    $scope.Tfilot.data = response.data.Data;
                    $scope.loader1 = false;
                }
                else {
                    $scope.loader1 = false;
                    $scope.OpenErrorPopup();
                }
            });
        }

        $scope.OpenSureDeletePopup = function (Name, Time) {
            $scope.Name_to_delete = Name;
            $scope.Time_do_delete = Time;
            currentDialog = ngDialog.open({
                template: 'Scripts/OvadiaApp/Admin/events-dialog/are-you-sure.html',
                scope: $scope
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

        $scope.OpenAddTfila = function () {
            $scope.currentTfila = {};
            currentDialog = ngDialog.open({
                template: 'Scripts/OvadiaApp/Admin/events-dialog/add-tfila.html',
                scope: $scope
            });
        }

        $scope.OpenEditTfila = function () {
            currentDialog = ngDialog.open({
                template: 'Scripts/OvadiaApp/Admin/events-dialog/edit-tfila.html',
                scope: $scope
            });
        }

        $scope.FormVadlidation = function () {
            if (eventDetailsForm != null)
                return eventDetailsForm.checkValidity();
            return false;
        }

        $scope.RemoveTflia = function () {
            $scope.loader = true;

            appServices.RemoveTfila($scope.currentTfila.ID).then(function (response) {
                if (response.data.ErrorCode == 0) {
                    $scope.loader = false;
                    $scope.closePopup();

                    var index = $scope.Tfilot.data.findIndex(function (o) {
                        return o.ID === $scope.currentTfila.ID;
                    });

                    $scope.Tfilot.data.splice(index, 1);
                    $scope.OpenSuccessPopup();
                }
                else {
                    $scope.loader = false;
                    $scope.closePopup();

                }
            });
        }

        //services
        $scope.AddTfila = function () {
            if (!$scope.FormVadlidation()) {
                return;
            }
            $scope.loader = true;
            appServices.AddTfila($scope.currentTfila).then(function (response) {
                if (response.data.ErrorCode == 0) {
                    $scope.loader = false;
                    $scope.currentTfila = response.data.Data;
                    $scope.Tfilot.data.push($scope.currentTfila);
                    $scope.closePopup();
                    $scope.OpenSuccessPopup();
                }
                else {
                    $scope.loader = false;
                    $scope.closePopup();
                    $scope.OpenErrorPopup();
                }
            });
        }

        $scope.editTfila = function (ID) {
            var index = $scope.Tfilot.data.findIndex(function (o) {
                return o.ID === ID;
            });

            $scope.currentTfila = $scope.Tfilot.data[index];

            $scope.OpenEditTfila();
        }

        $scope.SaveTfila = function () {
            if (!$scope.FormVadlidation()) {
                return;
            }
            $scope.loader = true;
            appServices.UpdateTfila($scope.currentTfila).then(function (response) {
                if (response.data.ErrorCode == 0) {
                    $scope.loader = false;
                    $scope.currentTfila = response.data.Data;

                    var index = $scope.Tfilot.data.findIndex(function (o) {
                        return o.ID === $scope.currentTfila.ID;
                    });
                    $scope.Tfilot.data.splice(index, 1);
                    $scope.Tfilot.data.push($scope.currentTfila);
                    $scope.closePopup();
                    $scope.OpenSuccessPopup();
                }
                else {
                    $scope.loader = false;
                    $scope.closePopup();
                    $scope.OpenErrorPopup();
                }
            });
        }

        self.init();
    }]);


OvadiaApp.directive('tfila-time', function () {
    return {
        restrict: 'E',
        bindToController: true,
        controller: 'tfilaTimeCtrl',
        templateUrl: '/Scripts/OvadiaApp/Admin/tfila-time/tfila-time.html'
    }
});