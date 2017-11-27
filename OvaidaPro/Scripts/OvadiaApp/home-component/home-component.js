OvadiaApp.controller('homeComponentCtrl', ['$scope', 'appServices', 'ngDialog', '$timeout',
    function ($scope, appServices, ngDialog, $timeout) {
        var self = this;
        //$scope.Tfilot = [];
        var currentDialog;
        $scope.cities = [];
        $scope.cities.push( " N, 32,  5, E, 34, 46, 2");
        console.log($scope.cities);

        self.init = function () {
            $scope.zmanim_loader = true;
            try {
                list_pos(" N, 32,  5, E, 34, 46, 2");
                doit("title");
                $scope.updateZmanimScope();
                $scope.zmanim_loader = false;
            }
            catch (e) {
                $scope.zmanim_loader = false;
            }


        }

        $scope.updateZmanimScope = function () {
            $scope.hatzot = document.data.chatzot;
            $scope.hanetz = document.data.hanetz;
            $scope.minchag = document.data.minchag;
            $scope.minchak = document.data.minchak;
            $scope.shkia = document.data.shkia;
            $scope.zet_kohavim = document.data.tzeit;
            $scope.plag = document.data.plag;
            $scope.shema = document.data.shema;
            $scope.tefillah = document.data.tefillah;
            $scope.alotearly = document.data.alotearly;
            $scope.alotlate = document.data.alotlate;
            $scope.misheyakir = document.data.misheyakir;
        }

        $scope.selectArea = function () {
            list_pos($scope.areaSelect);
            $scope.updateZmanimScope();
        }

        $scope.successMail = false;

        $scope.OpenLetter = function (recom) {
            $scope.OpenPopup("זמני שיעורים", recom);
        }

        $scope.OpenPopup = function (title, msg) {
            $scope.Title = title;
            $scope.Msg = msg;
            ngDialog.open({
                template: '/Scripts/OvadiaApp/Admin/events-dialog/recomm-image.html',
                //className: 'ngdialog-theme-default',
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