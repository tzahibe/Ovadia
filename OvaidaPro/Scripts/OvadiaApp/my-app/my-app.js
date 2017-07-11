﻿OvadiaApp.controller('myAppCtrl', ['$scope', 'appServices','UserAccount',
    function ($scope, appServices, UserAccount) {
        var self = this;
        var currentDialog = null;
        $scope.currentEvent = null;
        $scope.isMobile = false;

        self.init = function () {
            $scope.isMobileDevice();
        }

        $scope.isMobileDevice = function () {
                if (navigator.userAgent.match(/Android/i)
                    || navigator.userAgent.match(/webOS/i)
                    || navigator.userAgent.match(/iPhone/i)
                    || navigator.userAgent.match(/iPod/i)
                    || navigator.userAgent.match(/BlackBerry/i)
                    || navigator.userAgent.match(/Windows Phone/i)
                ) {
                    $scope.isMobile = true;
                    return true;
                }
                else {
                    $scope.isMobile = false;
                    return false;
                }
            }

        $scope.DateToClient = function (date) {
            try {

                var temp = new Date(parseInt(date.split('/Date(')[1].split(')/')[0]));

                var nday, nmonth;
                var day = temp.getDate();
                var month = (temp.getMonth() * 1 + 1);
                var year = temp.getFullYear();
                nday = temp.getDate();
                nmonth = (temp.getMonth() * 1 + 1);

                if (day * 1 < 10) {
                    nday = '0' + day;
                }
                if (month * 1 < 10) {
                    nmonth = '0' + month;
                }

                return nday + '/' + nmonth + '/' + year;


            }
            catch (e) {
                return null;
            }
        }


        $(window).scroll(function () {
            if (!$scope.isMobile) {
                return;
            }

            if (window.scrollY > 10) {
                $('.logo_img').hide(200);
                $('header-component .amburger').attr("style","padding-top:14px");
            }
            else {
                $('.logo_img').show(200).attr("padding-top", "0");
                $('header-component .amburger').attr("style", "padding-top:0");
            }
            
        });


        self.init();
     

    }]);

OvadiaApp.directive('myApp', function () {
    return {
        restrict: 'E',
        bindToController: true,
        controller: 'myAppCtrl',
        templateUrl:'/Scripts/OvadiaApp/my-app/my-app.html'
    }
});